''' Models '''

from src import db
from src.utils import BaseMixin, ReprMixin, SearchableMixin


''' IPinfo Table '''


class ipinfo(BaseMixin, ReprMixin, SearchableMixin, db.Model):
    __repr_fields__ = ['ip', 'country_code', 'isp']
    __searchable__ = ['ip', 'proxy_type', 'country_code', 'country_name', \
        'region', 'city', 'location', 'as_no', 'as_name', 'isp'\
        'domain', 'used_as', 'as_no', 'as_name' 
    ]

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

