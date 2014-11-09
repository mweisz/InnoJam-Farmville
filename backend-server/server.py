from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

import jaydebeapi
import os
import json
from flask import Flask, request, Response
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

def getDataFromDb(sql, params):
	con = connect()
	cur = con.cursor()
	cur.execute(sql, params)
	columns = [desc[0] for desc in cur.description]
	result = []
	for row in cur.fetchall():
		row = dict(zip(columns, row))
		result.append(row)
	return result

@app.route('/innojam/field')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getField():
	fieldID = request.args.get('fieldId', '')
	sql = "SELECT ID, X, Y FROM FARMVILLE.FIELD WHERE ID = ?"
	result = getDataFromDb(sql, (fieldID))
	
	return Response(json.dumps(result[0]),  mimetype='application/json')



if __name__ == "__main__":
	port = os.getenv('VCAP_APP_PORT', '5000')
	app.run(host='0.0.0.0', port=int(port), debug=True)