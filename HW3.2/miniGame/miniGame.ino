int potVal;
int potVal2;

int light = 0;
int light2 = 0;

int player1Score = 0;
int player2Score = 0;

int player1Seq[10];
int player2Seq[10];

void setup() {
  pinMode(10, OUTPUT);
  pinMode(3, OUTPUT);
}

void loop() {
  for (int i = 0; i < 10; i++) {
    player1Seq[i] = randomMaker();
  }

  for (int i = 0; i < 10; i++) {
    player2Seq[i] = randomMaker();
  }

  potVal = analogRead(A0);
  potVal2 = analogRead(A2);

  int outputVal = map(potVal, 0, 1023, 0, 255);
  int outputVal2 = map(potVal2, 0, 1023, 0, 255);

  int i = 0;
  int j = 0;

  analogWrite(10, outputVal);
  analogWrite(3, outputVal2);

  if (potVal == player1Seq[i]) {
    flashScore(10, outputVal);
    player1Score++;
    i++;
  }

  if (potVal2 == player2Seq[j]) {
    flashScore(3, outputVal2);
    player2Score++;
    j++;
  }

  if (player1Score == 10 || player2Score == 10) {
    potVal = 0;
    potVal2 = 0;
    if (player1Score > player2Score) {
      flashWin(10, 3);
    } else if (player2Score > player1Score) {
      flashWin(3, 10);
    } else {
      analogWrite(10, 255);
      analogWrite(3, 255);
      delay(100);
      analogWrite(10, 0);
      analogWrite(3, 0);
      delay(100);
      analogWrite(10, 255);
      analogWrite(3, 255);
      delay(100);
      analogWrite(10, 0);
      analogWrite(3, 0);
    }
  }
}

void flashWin(int num, int num2) {
  analogWrite(num2, 255);
  analogWrite(num, 255);
  delay(500);

  analogWrite(num, 255);
  delay(250);
  analogWrite(num, 0);
  delay(250);
  analogWrite(num, 255);
  delay(250);
  analogWrite(num, 0);
}

void flashScore(int num, int opv) {
  analogWrite(num, 255);
  delay(opv);
  analogWrite(num, 0);
  delay(100);
  analogWrite(num, 255);
  delay(opv);
  analogWrite(num, 0);
}

int randomMaker() {
  randomSeed(millis());
  return random(200, 800);
}
