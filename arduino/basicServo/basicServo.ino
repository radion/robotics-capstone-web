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
      for(int i = 179; i >= 70; i--) {
        servoMain.write(i);
        delay(10);
      }
      // Turn Servo Left to 45 degrees
    } else if(ch == '1') {
      for(int i = 70; i <= 180; i++) {
        servoMain.write(i);
        delay(10);
      }
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
      analogWrite(BLUEPIN, 0);
    } else if(ch == '5') {
      for(int j = 3; j >= 0; j--) {
        analogWrite(REDPIN, 255);
        analogWrite(GREENPIN, 0);
        analogWrite(BLUEPIN, 0);
        delay(400);
        for(int i = 179; i >= 70; i--) {
          servoMain.write(i);
          delay(10 - (6 - j*2));
        }
        analogWrite(REDPIN, 0);
        analogWrite(GREENPIN, 0);
        analogWrite(BLUEPIN, 0);
        for(int i = 70; i <= 180; i++) {
          servoMain.write(i);
          delay(10 - (6 - j*2));
        }
        analogWrite(REDPIN, 0);
        analogWrite(GREENPIN, 255);
        analogWrite(BLUEPIN, 0);
      }
    }
  }
   
}
