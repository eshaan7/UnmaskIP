import os

basedir = os.path.abspath(os.path.dirname(__file__))

''' Flask related Configurations. Note: DO NOT FORGET TO CHANGE SECRET_KEY ! '''

class BaseConfig:

    DOMAIN = 'http://127.0.0.1:5000/api/v1/'

    # DOMAIN = 'https://unmaskip.herokuapp.com/api/v1/'

    MARSHMALLOW_STRICT = True
    MARSHMALLOW_DATEFORMAT = 'rfc'

    WTF_CSRF_ENABLED = False
    MAX_AGE = 86400

    RATELIMIT_DEFAULT = "24000/day;2400/hour;100/minute;6/second"
    RATELIMIT_HEADERS_ENABLED = True
    RATELIMIT_STRATEGY = 'fixed-window'

    JSON_SORT_KEYS = False 


class Config(BaseConfig):
    # 11,67,995 datasets
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") # "postgres://eshaan:@localhost/bytekarma" 
    SHODAN_API_KEY = 'FP8Q9eOJdaGulEuHVJswVqPZTrnvOGu0'
    # ELASTICSEARCH_URL =  os.environ.get("BONSAI_URL") # 'http://localhost:9200'
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    DEBUG = False # Turn DEBUG OFF before deployment