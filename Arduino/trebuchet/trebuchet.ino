//Arduino to p5.js code adapted from the tutorial on potentiometer: 
//https://medium.com/@yyyyyyyuan/tutorial-serial-communication-with-arduino-and-p5-js-cd39b3ac10ce

const int led1Pin =  9; // pin number for LED output 
const int sensorPin = A0; // pin number for sensing potentiometer
int outputValue = 0;    // variable for indicating how bright the LED is

void setup() {
  pinMode(led1Pin, OUTPUT);  // Set up the LED pin to be an output:  
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(A0); // read from the pressure sensor ;
  outputValue = map(sensorValue, 0, 1023, 0, 255); // map the value from pressure sensor (range from 0 to 1023) to the outputValue (from 0 to 255)

  // writes to the serial monitor as an output
  Serial.write(outputValue);
  
  if (sensorValue >= 0) {
    analogWrite(led1Pin, outputValue);  // turn the LED on at specific output values
  } else{
    digitalWrite(led1Pin, LOW);  // turn the LED off at specific output values
  }
  delay(10);
}
