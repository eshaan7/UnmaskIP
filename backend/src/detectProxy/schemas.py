''' Schemas '''

from src import ma
from .models import ipinfo


class IPinfoSchema(ma.ModelSchema):
	class Meta:
		model = ipinfo
		
	id = ma.Integer(dump_only=True)
	country_code = ma.String(required=True)
	country_name = ma.String(required=True)
	proxy_type = ma.String(required=True)

