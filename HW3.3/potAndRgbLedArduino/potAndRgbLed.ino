int redPin = 5;
int greenPin = 4;
int bluePin = 3;

const int numReadings = 10;
int potReadings[numReadings];  
int readIndex = 0;             
float potTotal = 0;            
float potAverage = 0;          
float potStart;                
bool start = false;
unsigned long lastTime = 0;
const int interval = 16;

void setup() {
  pinMode(A0, INPUT);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  Serial.begin(57600);

  for (int i = 0; i < numReadings; i++) {
    potReadings[i] = 0;
  }
}

void loop() {
  int potVal = analogRead(A0);
  int circlePosVal = map(potVal, 0, 1023, 0, 359);

  while (Serial.available() > 0) {
    int red = Serial.parseInt();
    int green = Serial.parseInt();
    int blue = Serial.parseInt();

    if (Serial.read() == '\n') {
      red = constrain(red, 0, 255);
      green = constrain(green, 0, 255);
      blue = constrain(blue, 0, 255);

      analogWrite(redPin, red);
      analogWrite(greenPin, green);
      analogWrite(bluePin, blue);
    }
  }

  potTotal = potTotal - potReadings[readIndex];
  potReadings[readIndex] = circlePosVal;
  potTotal = potTotal + circlePosVal;
  readIndex = readIndex + 1;

  potAverage = potTotal / numReadings;

  if (readIndex >= numReadings) {
    readIndex = 0;
    if (!start) {
      potStart = potAverage;
      start = true;
    }
  }

  if (start) {
    unsigned long now = millis();
    if (now - lastTime > interval) {
      Serial.println((int)(potAverage - potStart));

      lastTime = now;
    }
  }
}
