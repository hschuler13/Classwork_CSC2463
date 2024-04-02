int maxLvl = 50;
int lvl = 1;
int flashSpeed = 1000;

void setup() {
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  pinMode(A2, INPUT);
  pinMode(A3, INPUT);

  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);

  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  digitalWrite(4, LOW);
  digitalWrite(5, LOW);
}

void loop() {


  void create_sequence() {
    randomSeed(millis());

    for(int i = 0; i < maxLvl; i++){
      sequence[i] = random(2, 6); 
    }
  }

  void set_sequence() {
    digitalWrite(2, LOW);
    digitalWrite(3, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);

    for (int i = 0; i < lvl; i++) {
      digitalWrite(sequence[i], HIGH);
      delay(flashSpeed);
      digitialWrite(sequence[i], LOW);
      delay(flashSpeed);
    }
  }

  void get_sequence() {
    int check = 0;

    for (int i = 0; i < lvl; i++){
      check = 0;

      while(check == 0){
        if (digitalRead(A0) == LOW){
          check = 1;
          
          if (user_sequence[i] != sequence[i]){
            wrong_sequence();
            return;
          }
        }
      }
    }
  }

  void good_input() {
    for (int i = 0; i < 2; i++) {
      digitalWrite(2, HIGH);
      digitalWrite(3, LOW);
      digitalWrite(4, HIGH);
      digitalWrite(5, LOW);
      delay(1000);
      digitalWrite(2, LOW);
      digitalWrite(3, HIGH);
      digitalWrite(4, LOW);
      digitalWrite(5, HIGH);
      delay(1000);
    }
    digitalWrite(2, HIGH);
    digitalWrite(3, HIGH);
    digitalWrite(4, HIGH);
    digitalWrite(5, HIGH);
    delay(1000);
    digitalWrite(2, LOW);
    digitalWrite(3, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);

    if (lvl < maxLvl){
      lvl++;
      flashSpeed -= 50;
    }
  }

  void bad_input() {
    digitalWrite(2, HIGH);
    digitalWrite(3, HIGH);
    digitalWrite(4, HIGH);
    digitalWrite(5, HIGH);
    delay(1000);
    digitalWrite(2, LOW);
    delay(1000);
    digitalWrite(3, LOW);
    delay(1000);
    digitalWrite(4, LOW);
    delay(1000);
    digitalWrite(5, LOW);

    lvl = 1;
    flashSpeed = 1000;
  }
}
