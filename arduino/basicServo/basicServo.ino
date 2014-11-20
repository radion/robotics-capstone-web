/*
  Arduino Sketch to control servo using the motor sheild
  Author: Rushabh Mehta
*/
#include <Servo.h>
Servo servoMain;

#define REDPIN 9
#define GREENPIN 10
#define BLUEPIN 11
#define FADESPEED 5 // make this higher to slow down

void setup(){
   pinMode(REDPIN, OUTPUT);
    pinMode(GREENPIN, OUTPUT);
    pinMode(BLUEPIN, OUTPUT);
   servoMain.attach(A5);
   Serial.begin(9600);
}

void loop() {

  if (Serial.available()) {
    char ch = Serial.read();
    Serial.println(ch);
    if(ch == '0') {
      servoMain.write(45);  // Turn Servo Left to 45 degrees
    } else if(ch == '1') {
      servoMain.write(180); // Turn Servo Right to 180 degrees
    } else if(ch == '2') {
      analogWrite(REDPIN, 255);
      analogWrite(GREENPIN, 0);
      analogWrite(BLUEPIN, 0);
    } else if(ch == '3') {
      analogWrite(REDPIN, 0);
      analogWrite(GREENPIN, 255);
      analogWrite(BLUEPIN, 0);
    } else if(ch == '4') {
      analogWrite(REDPIN, 0);
      analogWrite(GREENPIN, 0);
      analogWrite(BLUEPIN, 255);
    }
  }
   
}
