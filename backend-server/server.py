import jaydebeapi
import os
import json

from flask import Flask, request, Response
from functools import update_wrapper
app = Flask(__name__)

class HANA:
    HOST = '23.23.134.136'
    PASSWORD = 'CodeJam2014'
    PORT = 30015
    USER = 'CODEJAMMER'

url = 'jdbc:sap://%s:%s' %(HANA.HOST, HANA.PORT)

def connect():
    return jaydebeapi.connect(
        'com.sap.db.jdbc.Driver',
        [url, HANA.USER, HANA.PASSWORD],
        'ngdbc.jar')

@app.route('/innojam/field')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getField():
	fieldID = request.args.get('fieldId', '')
	print "Get fieldId = " + str(fieldID)
	con = connect()
	cur = con.cursor()
	cur.execute("SELECT ID, X, Y FROM FARMVILLE.FIELD WHERE ID = ?", (fieldID))
	columns = [desc[0] for desc in cur.description]
	result = []
	for row in cur.fetchall():
		row = dict(zip(columns, row))
		result.append(row)
	
	return Response(json.dumps(result[0]),  mimetype='application/json')



if __name__ == "__main__":
	port = os.getenv('VCAP_APP_PORT', '5000')
	app.run(host='0.0.0.0', port=int(port), debug=True)