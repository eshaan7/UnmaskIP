''' Models '''

from src import db
from src.utils import BaseMixin, ReprMixin


''' IPinfo Table '''


class ipinfo(BaseMixin, ReprMixin, db.Model):
    __repr_fields__ = ['ip', 'country_code', 'isp']
    # __searchable__ = ['ip', 'proxy_type', 'country_code', 'country_name', \
    #     'region', 'city', 'location', 'isp',\
    #     'domain', 'used_as', 'as_no', 'as_name' 
    # ]

    ip = db.Column(db.String(32), nullable=False, unique=True, index=True)
    proxy_type = db.Column(db.String(3), nullable=False)

    country_code = db.Column(db.String(2), nullable=False)
    country_name = db.Column(db.String(64), nullable=False)
    region = db.Column(db.String(64))
    city = db.Column(db.String(64))
    location = db.Column(db.String(12))
    # Geo-point expressed as a string with the format: "lat,lon"

    isp = db.Column(db.String(64))
    domain = db.Column(db.String(64))
    used_as = db.Column(db.String(12))

    as_no = db.Column(db.Integer())
    as_name = db.Column(db.String(32))

    def agg_top_n(self, data):
        try:
            if 'countryCodeEquals' in data.keys():
                cce = data['countryCodeEquals']
                print("1")
                sql = f"SELECT {data['colList']}, count({data['colCount']}) FROM ipinfo \
                        where ipinfo.country_code={cce} \
                        GROUP BY {data['colList']} \
                        ORDER BY count desc limit {data['limit']}"
            else:
                print("2")
                sql = f"SELECT {data['colList']}, count({data['colCount']}) FROM ipinfo \
                        GROUP BY {data['colList']} \
                        ORDER BY count desc limit {data['limit']}"
            
            res = db.session.execute(sql)
            if res:
                data = constructData(res.keys(), res.fetchall())
                return data
        except Exception as e:
            print("Error: ", e)
            return None



def constructData(keys, values):
    data = [dict(zip(keys, v)) for v in values]
    return data
