import serial
import time
import datetime



TEMP_UPDATE_INTERVALL = 3



class ArduinoController(object):
    TEMPERATURE = '1'
    LED_ON = '3'
    LED_OFF = '4'
    ENGINE = '5'
    
    def __init__(self, ser):
        self.ser = ser

    def get_temp(self):
        self.ser.write(ArduinoController.TEMPERATURE)
        answer = self.ser.readline()
        print answer
        return float(answer.split()[0])





if __name__ == '__main__':
    ardu = ArduinoController(serial.Serial('/dev/tty.usbmodem1451', 9600))
    last_update = 0
    last_light = ''
    last_water = ''
    while True:
        print "SELECT light, time, value FROM events WHERE event = 'Light' AND time > last_light"

        print "SELECT water, time, value FROM events WHERE event = 'Water' AND time > last_light"

        now = time.time()
        if ((now - last_update) > TEMP_UPDATE_INTERVALL):
            temp = ardu.get_temp()
            print "INSERT INTO events VALUES (3, 1, 'Lettuce', 'Temperature', %s, %f)" % (str(datetime.datetime.now()), temp)
            last_update = now
        time.sleep(0.4)
