import jaydebeapi

host = "23.23.134.136"
port = 30015
user = "CODEJAMMER"
password = "CodeJam2014"

url = 'jdbc:sap://%s:%s' %(host, port)
connection = jaydebeapi.connect(
    'com.sap.db.jdbc.Driver',
    [url, user, password],
    'ngdbc.jar')

cursor = connection.cursor()

cursor.execute("SELECT * FROM FARMVILLE.PLANTS")

for row in cursor.fetchall():
	print row
