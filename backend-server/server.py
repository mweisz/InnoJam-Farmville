import jaydebeapi
import os

from flask import Flask, request
app = Flask(__name__)

host = "23.23.134.136"
port = 30015
user = "CODEJAMMER"
password = "CodeJam2014"

def connect(host, port, user, password):
    url = 'jdbc:sap://%s:%s' %(host, port)
    return jaydebeapi.connect(
        'com.sap.db.jdbc.Driver',
        [url, user, password],
        'ngdbc.jar')

def disconnect(connection):
    connection.close()

# connection = connect(host, port, user, password)

# cursor = connection.cursor()

# cursor.execute("SELECT * FROM FARMVILLE.PLANTS")

# for row in cursor.fetchall():
# 	print row


@app.route('/innojam/field')
def getField():
	fieldID = request.args.get('fieldId', '')
	print fieldID



if __name__ == "__main__":
	port = os.getenv('VCAP_APP_PORT', '5000')
	app.run(host='0.0.0.0', port=int(port), debug=True)