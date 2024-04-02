void setup() {
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(2, INPUT);
  pinMode(4, INPUT);
}

void loop() {
  int power = digitalRead(2);
  int power2 = digitalRead(4);

  if (power == HIGH) {
    //L
    digitalWrite(7, HIGH);
    delay(100);
    digitalWrite(7, LOW);
    delay(100);
    digitalWrite(7, HIGH);
    delay(300);
    digitalWrite(7, LOW);
    delay(100);
    digitalWrite(7, HIGH);
    delay(100);
    digitalWrite(7, LOW);
    delay(100);
    digitalWrite(7, HIGH);
    delay(100);
    digitalWrite(7, LOW);
    delay(300);

    //S
    digitalWrite(7, HIGH);
    delay(100);
    digitalWrite(7, LOW);
    delay(100);
    digitalWrite(7, HIGH);
    delay(100);
    digitalWrite(7, LOW);
    delay(100);
    digitalWrite(7, HIGH);
    delay(100);
    digitalWrite(7, LOW);
    delay(300);

    //U
    digitalWrite(7, HIGH);
    delay(100);
    digitalWrite(7, LOW);
    delay(100);
    digitalWrite(7, HIGH);
    delay(100);
    digitalWrite(7, LOW);
    delay(100);
    digitalWrite(7, HIGH);
    delay(300);
    digitalWrite(7, LOW);
    delay(300);
  }
  digitalWrite(7, LOW);

  if (power2 == HIGH) {
    //C
    digitalWrite(8, HIGH);
    delay(300);
    digitalWrite(8, LOW);
    delay(100);
    digitalWrite(8, HIGH);
    delay(100);
    digitalWrite(8, LOW);
    delay(100);
    digitalWrite(8, HIGH);
    delay(300);
    digitalWrite(8, LOW);
    delay(100);
    digitalWrite(8, HIGH);
    delay(100);
    digitalWrite(8, LOW);
    delay(300);

    //S
    digitalWrite(8, HIGH);
    delay(100);
    digitalWrite(8, LOW);
    delay(100);
    digitalWrite(8, HIGH);
    delay(100);
    digitalWrite(8, LOW);
    delay(100);
    digitalWrite(8, HIGH);
    delay(100);
    digitalWrite(8, LOW);
    delay(300);

    //C
    digitalWrite(8, HIGH);
    delay(300);
    digitalWrite(8, LOW);
    delay(100);
    digitalWrite(8, HIGH);
    delay(100);
    digitalWrite(8, LOW);
    delay(100);
    digitalWrite(8, HIGH);
    delay(300);
    digitalWrite(8, LOW);
    delay(100);
    digitalWrite(8, HIGH);
    delay(100);
    digitalWrite(8, LOW);
    delay(300);
  }
  digitalWrite(8, LOW);
}
