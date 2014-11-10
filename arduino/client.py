import serial
import time
import datetime
import requests



TEMP_UPDATE_INTERVALL = 3



class ArduinoController(object):
    TEMPERATURE = '1'
    LED_ON = '3'
    LED_OFF = '4'
    ENGINE = '5'
    water_set = 0
    
    def __init__(self, ser):
        self.ser = ser

    def get_temp(self):
        self.ser.write(ArduinoController.TEMPERATURE)
        answer = self.ser.readline()
        print answer
        return float(answer.split()[0])

    def set_LED(self, value):
        if value == 1:
            self.ser.write(ArduinoController.LED_ON)
        else:
            self.ser.write(ArduinoController.LED_OFF)
        answer = self.ser.readline()
        print answer

    def set_water(self):
        if ArduinoController.water_set == 1:
            print 'water already set.'
            return
        ArduinoController.water_set = 1
        self.ser.write(ArduinoController.ENGINE)
        answer = self.ser.readline()
        print answer





HANA_URL = 'http://54.77.126.96:5005'


def query(q_str):
    print q_str
    try:
        result = requests.get(HANA_URL, params={'query': q_str})
        print result.json()
    except requests.exceptions.ConnectionError:
        print 'caught insert exception'
        return
    return result.json()

# def get_last(results):
#     if len(results) == 0:
#         return 0
#     last = results[0]
#     for i in results[1:]:
#         if i["TIME"] > last["TIME"]:
#             last = i
#     return last



if __name__ == '__main__':
    ardu = ArduinoController(serial.Serial('/dev/tty.usbmodem1451', 9600))
    last_update = 0
    last_light = ''
    last_water = ''
    while True:
        # handle light
        result_last = query("SELECT time, value FROM farmville.events WHERE fieldId = 1 AND event = 'Light' order by time desc limit 1")
        if result_last and result_last[0]["TIME"] > last_light:
            result_last = result_last[0]
            print '%s: LED %d' % (result_last['TIME'], result_last['VALUE'])
            last_light = result_last['TIME']
            ardu.set_LED(result_last['VALUE'])

        # handle water
        result_last = query("SELECT time, value FROM farmville.events WHERE fieldId = 1 AND event = 'Water' order by time desc limit 1")
        if result_last and result_last[0]["TIME"] > last_water:
            result_last = result_last[0]
            print '%s: Water on' % (result_last['TIME'])
            last_water = result_last['TIME']
            ardu.set_water()

        # handle temp
        now = time.time()
        if ((now - last_update) > TEMP_UPDATE_INTERVALL):
            temp = ardu.get_temp()
            query("INSERT INTO farmville.events VALUES (3, 1, 'Lettuce', 'Temperature', '%s', %f)" % (str(datetime.datetime.now()), temp))
            last_update = now
        time.sleep(0.4)
