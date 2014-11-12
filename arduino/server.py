import serial
from flask import Flask



ser = serial.Serial('/dev/tty.usbmodem1411', 9600)
app = Flask(__name__)




@app.route("/")
def hello():
    return "Hello World!"

@app.route('/command/<int:option>')
def command(option):
    ser.write("%d" % option)
    answer = ser.readline()
    return answer

if __name__ == "__main__":
    app.run(host='0.0.0.0')