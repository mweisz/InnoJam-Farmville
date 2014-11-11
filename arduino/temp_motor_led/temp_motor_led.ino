/*
Arduino code for:
  temperature sensor
  single LED control
  montor control


TEMPERATURE SENSOR
  More information on the sensor is available in the datasheet:
  http://dlnmh9ip6v2uc.cloudfront.net/datasheets/Sensors/Temp/TMP35_36_37.pdf
*/




const int temperaturePin = 0;
const int motorPin = 9;
const int ledPin = 13;


void setup()
{
  // In this sketch, we'll use the Arduino's serial port
  // to send text back to the main computer. For both sides to
  // communicate properly, they need to be set to the same speed.
  // We use the Serial.begin() function to initialize the port
  // and set the communications speed.
  
  // The speed is measured in bits per second, also known as
  // "baud rate". 9600 is a very commonly used baud rate,
  // and will transfer about 10 characters per second.
  pinMode(motorPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}


void loop()
{  
  if (Serial.available() > 0) {
    int choice = Serial.parseInt();
      float voltage, degreesC, degreesF;
      voltage = getVoltage(temperaturePin);
      degreesC = (voltage - 0.5) * 100.0;
      degreesF = degreesC * (9.0/5.0) + 32.0;
    switch(choice) {
      case 1: Serial.print(degreesC);
       Serial.println(" deg C"); 
        break;
      case 2: Serial.print(degreesF);
        Serial.println(" deg F");
        break;
      case 3: digitalWrite(ledPin, HIGH);
        Serial.println("Light on");
        break;
      case 4: digitalWrite(ledPin, LOW);
        Serial.println("Light off");
        break;
      case 5:
        motorOnThenOff();
        Serial.println("Engine on and off");
        break;
      default: Serial.println("Not in use.");
    }
  }
  delay(1000); // repeat once per second (change as you wish!)
}

void motorOnThenOff()
{
  int onTime = 1000;  // milliseconds to turn the motor on
  //analogWrite(motorPin, 200);
  digitalWrite(motorPin, HIGH); // turn the motor on (full speed)
  delay(onTime);                // delay for onTime milliseconds
  digitalWrite(motorPin, LOW);  // turn the motor off
}



float getVoltage(int pin)
{
  // This function has one input parameter, the analog pin number
  // to read. You might notice that this function does not have
  // "void" in front of it; this is because it returns a floating-
  // point value, which is the true voltage on that pin (0 to 5V).
  
  // You can write your own functions that take in parameters
  // and return values. Here's how:
  
    // To take in parameters, put their type and name in the
    // parenthesis after the function name (see above). You can
    // have multiple parameters, separated with commas.
    
    // To return a value, put the type BEFORE the function name
    // (see "float", above), and use a return() statement in your code
    // to actually return the value (see below).
  
    // If you don't need to get any parameters, you can just put
    // "()" after the function name.
  
    // If you don't need to return a value, just write "void" before
    // the function name.

  // Here's the return statement for this function. We're doing
  // all the math we need to do within this statement:
  
  return (analogRead(pin) * 0.004882814);
  
  // This equation converts the 0 to 1023 value that analogRead()
  // returns, into a 0.0 to 5.0 value that is the true voltage
  // being read at that pin.
}

// Other things to try with this code:

//   Turn on an LED if the temperature is above or below a value.

//   Read that threshold value from a potentiometer - now you've
//   created a thermostat!

