# from flask import current_app
# import re, os
# from pprint import pprint

# def generateESheader():

#     # Parse the auth and host from env:
#     bonsai = os.environ['BONSAI_URL']
#     auth = re.search(r'https\:\/\/(.*)\@', bonsai).group(1).split(':')
#     host = bonsai.replace('https://%s:%s@' % (auth[0], auth[1]), '')

#     # optional port
#     match = re.search('(:\d+)', host)
#     if match:
#         p = match.group(0)
#         host = host.replace(p, '')
#         port = int(p.split(':')[1])
#     else:
#         port=443

#     # Connect to cluster over SSL using auth for best security:
#     es_header = [{
#     'host': host,
#     'port': port,
#     'use_ssl': True,
#     'http_auth': (auth[0],auth[1])
#     }]

#     return es_header

# def add_to_index(index, model):
#     if not current_app.elasticsearch:
#         return
#     payload = {}
#     for field in model.__searchable__:
#         payload[field] = getattr(model, field)
#     current_app.elasticsearch.index(index=index, id=model.id, body=payload)


# def remove_from_index(index, model):
#     if not current_app.elasticsearch:
#         return
#     current_app.elasticsearch.delete(index=index, id=model.id)


# def query_index(index, query):
#     if not current_app.elasticsearch:
#         return [], 0
#     search = current_app.elasticsearch.search(
#         index=index,
#         body={'query': {'multi_match': {'query': query, 'fields': ['*']}}})
#     ids = [int(hit['_id']) for hit in search['hits']['hits']]
#     return ids, search['hits']['total']['value']


# def get_n_docs(index, n):
#     if not current_app.elasticsearch:
#         return [], 0
#     res = current_app.elasticsearch.search(
#         index=index, body={"query": {"match_all": {}}, "size": n})
#     docs = [hit['_source'] for hit in res['hits']['hits']]
#     return docs, res['hits']['total']['value']


# def get_aggregations(index, fieldname, size):
#     payload = {
#         "aggs": {
#             "2": {
#                 "terms": {
#                     "field": f"{fieldname}.keyword",
#                     "order": {
#                         "_count": "desc"
#                     },
#                     "size": size
#                 }
#             }
#         },
#         "size": 0,
#         "_source": {
#             "excludes": []
#         },
#         "stored_fields": [
#             "*"
#         ],
#         "script_fields": {},
#         "docvalue_fields": [],
#         "query": {
#             "bool": {
#                 "must": [],
#                 "filter": [
#                     {
#                         "match_all": {}
#                     }
#                 ],
#                 "should": [],
#                 "must_not": []
#             }
#         }
#     }
#     res = current_app.elasticsearch.search(index=index, body=payload)
#     buckets = []
#     for b in res['aggregations']['2']['buckets']:
#         buckets.append({"name": b['key'], "value": b['doc_count']})
#     return buckets
