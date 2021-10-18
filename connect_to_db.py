import os
from py2neo import Graph, Node, Relationship

url = os.environ.get('GRAPHENEDB_URL', 'neo4j+s://111736e4.databases.neo4j.io:7687')
username = os.environ.get('neo4j')
password = os.environ.get('_Ut_RLP3PlIuK_OAxvDsWoaDXdaUCWoLHVnuf3iSH40')

graph = Graph(url + '/db/data/', username=username, password=password)
