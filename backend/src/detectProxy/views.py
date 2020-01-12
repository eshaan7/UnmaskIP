from flask import jsonify, make_response, request
from flask_restful import Resource

from .corefunctions import fetchIPInfo, fetchFromShodan
from src import api, db
from .models import ipinfo
from .schemas import IPinfoSchema


class count_api(Resource):

    def get(self):
        try:
            # docs, n = get_n_docs("ipinfo", 3500)
            obj = {
                'ip': ipinfo.query.count(),
                'isp': ipinfo.query.distinct(ipinfo.isp).count(),
                'country': ipinfo.query.distinct(ipinfo.country_code).count()
            }
            return make_response(jsonify(obj), 200)
        except Exception as e:
            return make_response(jsonify(
                {'meta': {'code': 400, 'error': str(e)}}
            ), 400)


class aggregation_api(Resource):

    def get(self):
        try:
            data = request.args
            buckets = ipinfo.agg_top_n(ipinfo, data)
            if buckets is not None:
                return make_response(jsonify(buckets), 200)
            else:
                raise "Wrong parameters"

        except Exception as e:

             return make_response(jsonify(
                {'meta': {'code': 400, 'error': str(e)}}
            ), 400)


class CheckIP_api(Resource):
    model = ipinfo
    schema = IPinfoSchema

    def get(self, ip_to_check):
        # have to implement whois record fetching
        try:
            ipinfo = self.model.query.filter_by(ip=ip_to_check).first()

            if not ipinfo:
                new_ipinfo = fetchIPInfo(ip_to_check)
                if not new_ipinfo:
                    return make_response(
                        jsonify(
                            {"ip": ip_to_check},
                            {"status": "clean"}
                        )
                    )
                new_ipinfo_obj = self.schema.load(new_ipinfo)
                db.session.add(new_ipinfo_obj)
                db.session.commit()
                return jsonify(
                    self.schema(many=False).dump(new_ipinfo_obj).data
                )
            else:
                return jsonify(
                    self.schema(many=False).dumps(ipinfo)  # .data
                )

        except Exception as e:
            return make_response(jsonify(
                {'meta': {'code': 400, 'error': str(e)}}), 400)


class fetchIPinfo_api(Resource):

    def get(self, ip_to_check):

        ipinfo = fetchFromShodan(ip_to_check)
        if ipinfo:
            # add to database ??
            return make_response(jsonify(ipinfo), 200)
        else:
            return make_response(
                jsonify(
                    {"ip": ip_to_check},
                    {"status": "clean"}
                )
            )


api.add_resource(count_api, '/get_count/')
api.add_resource(CheckIP_api, '/checkip/<ip_to_check>/')
api.add_resource(aggregation_api, '/get_aggregation/')
api.add_resource(fetchIPinfo_api, '/fetchipinfo/<ip_to_check>/')

