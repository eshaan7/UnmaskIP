from flask import jsonify, make_response
from flask_restful import Resource

from .corefunctions import fetchIPInfo
from src import api, db, get_all
from .models import ipinfo
from .schemas import IPinfoSchema


class IPinfo_api(Resource):

    def get(self):
        try:
            docs, n = get_all("ipinfo")
            print(n)
            return make_response(jsonify(docs), 200)
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
                    self.schema(many=False).dumps(ipinfo) #.data
                )

        except Exception as e:
            return make_response(jsonify(
                {'meta': {'code': 400, 'error': str(e)}}), 400)


api.add_resource(IPinfo_api, '/ipinfo/')
api.add_resource(CheckIP_api, '/checkip/<ip_to_check>')
