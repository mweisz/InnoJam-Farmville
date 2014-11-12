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

import os
import datetime
import json
from flask import Flask, request, Response
import urllib2
import requests

UPLOAD_FOLDER = './img'
ALLOWED_EXTENSIONS = set(['jpg'])
# HANA_URL = "http://54.77.126.96:5005"
HANA_URL = "http://213.165.85.254:5005"

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def dbRequest(sql):
	payload = {'query': sql}
	result = requests.get(HANA_URL, params=payload)
	return result.json()

def dbPost(sql):
	payload = {'query': sql}
	try:
		requests.get(HANA_URL, params=payload)
	except:
		print "As expected"

@app.route('/innojam/fields')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getAllFields():
	sql = "SELECT ID, X, Y FROM FARMVILLE.FIELD"
	result = dbRequest(sql)
	return Response(json.dumps(result),  mimetype='application/json')

@app.route('/innojam/allAvailablePlants')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getAvailablePlants():
	sql = "SELECT ID, NAME FROM FARMVILLE.PLANTS"
	result = dbRequest(sql)
	return Response(json.dumps(result),  mimetype='application/json')

@app.route('/innojam/brightness')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getBrightness():
	# fieldID = request.args.get('fieldId', '')
	# sql = "SELECT ID, FIELDID, PLANT, EVENT, TIME, VALUE FROM FARMVILLE.PLANTS WHERE FIELDID = ? AND EVENT = 'Light'"
	# result = getDataFromDb(sql, fieldID)
	# return Response(json.dumps(result),  mimetype='application/json')
	return "Brightness"

@app.route('/innojam/field')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getField():
	fieldID = request.args.get('fieldId', '')
	sql = "SELECT ID, X, Y FROM FARMVILLE.FIELD WHERE ID = " + str(fieldID)
	result = dbRequest(sql)
	return Response(json.dumps(result[0]),  mimetype='application/json')

@app.route('/innojam/plantInField')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getPlantInField():
	fieldID = request.args.get('fieldId', '')
	sql = "SELECT FIELDID, PLANT FROM FARMVILLE.EVENTS WHERE FIELDID = " + str(fieldID)
	result = dbRequest(sql)
	return Response(json.dumps(result[0]),  mimetype='application/json')

@app.route('/innojam/temperature')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getTemperature():
	fieldID = request.args.get('fieldId', '')
	sql = "SELECT ID, FIELDID, PLANT, EVENT, TIME, VALUE FROM FARMVILLE.EVENTS WHERE FIELDID = " + str(fieldID) + " AND EVENT = 'Temperature' ORDER BY TIME DESC LIMIT 1"
	result = dbRequest(sql)
	return Response(json.dumps(result),  mimetype='application/json')

@app.route('/innojam/temperatures')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getTemperatures():
	fieldID = request.args.get('fieldId', '')
	sql = "SELECT ID, FIELDID, PLANT, EVENT, TIME, VALUE FROM FARMVILLE.EVENTS WHERE FIELDID = " + str(fieldID) + " AND EVENT = 'Temperature' ORDER BY TIME DESC LIMIT 50"
	result = dbRequest(sql)
	return Response(json.dumps(result),  mimetype='application/json')

@app.route('/innojam/wettness')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def getWettness():
	fieldID = request.args.get('fieldId', '')
	sql = "SELECT ID, FIELDID, PLANT, EVENT, TIME, VALUE FROM FARMVILLE.EVENTS WHERE FIELDID = " + str(fieldID) + " AND EVENT = 'Water'"
	result = dbRequest(sql)
	return Response(json.dumps(result),  mimetype='application/json')

@app.route('/innojam/toggleLights')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def toggleLights():
	sql = "SELECT VALUE FROM FARMVILLE.EVENTS WHERE EVENT = 'Light' ORDER BY TIME DESC LIMIT 1"
	result = dbRequest(sql)
	light = result[0]["VALUE"]
	newLight = 1 if light == 0 else 0
	sql = "INSERT INTO FARMVILLE.EVENTS VALUES(4,1,'Tomato','Light','" + str(datetime.datetime.now()) + "'," + str(newLight) + ")"
	dbPost(sql)
	return "Toggled Lights"

@app.route('/innojam/turnLightsOff')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def turnLightsOff():
	sql = "INSERT INTO FARMVILLE.EVENTS VALUES(4,1,'Tomato','Light','"+ str(datetime.datetime.now()) + "',0)"
	dbPost(sql)
	return "Turned lights off"

@app.route('/innojam/turnLightsOn')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def turnLightsOn():
	sql = "INSERT INTO FARMVILLE.EVENTS VALUES(4,1,'Tomato','Light','" + str(datetime.datetime.now()) + "',1)"
	dbPost(sql)
	return "Turned lights on"

@app.route('/innojam/waterField')
@crossdomain("*", headers='Origin, X-Requested-With, Content-Type, Accept')
def waterField():
	sql = "INSERT INTO FARMVILLE.EVENTS VALUES(4,1,'Tomato','Water','" + str(datetime.datetime.now()) + "',100)"
	dbPost(sql)
	return "Watered Field"



if __name__ == "__main__":
	port = os.getenv('VCAP_APP_PORT', '5000')
	app.run(host='0.0.0.0', port=int(port), debug=True)