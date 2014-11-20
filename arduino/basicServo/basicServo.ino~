/*
  Arduino Sketch to control servo using the motor sheild
  Author: Rushabh Mehta
*/
#include <Servo.h>
Servo servoMain;

void setup(){
   servoMain.attach(A0);
   Serial.begin(9600);
}

void loop() {

  if (Serial.available()) {
    char ch = Serial.read();
    Serial.println(ch);
    if(ch == '0') {
      servoMain.write(45);  // Turn Servo Left to 45 degrees
    } else {
      servoMain.write(180); // Turn Servo Right to 180 degrees
    }
  }
   
}
