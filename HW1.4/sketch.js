let sprite;
let beetle;
let font;
let bugs = [];
let screen = 1;
let timerLength = 30;
let deadBugs = 0;

function preload(){
  let animations = {
    walk: {row: 0, frames: 7},
    squish: {row: 1, frames: 1}
  }

  //use Math.floor(Math.random() * num);
  beetle = new Character (200,200,32,32,'assets/beetle(1).png',animations);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  //beetle.left();
  if (screen == 1){
    gameStart();
  }
  else if (screen == 2){
    gameEnd();
  }
  else{
    gamePlaying();
  }

}

function gameStart(){
  text("Press the space button to start!", 200, 200);
  if (kb.pressing(' ')){
    screen = 0;
  }
}

function gamePlaying(){
  text("timer: " + ceil(timerLength),300,20);
  text("score: " + deadBugs,100,20);
  timerLength -= deltaTime/1000;
  if (timerLength < 0){
    screen = 2;
  }
}

function gameEnd(){
  text("Game end!", 200, 150);
  text("Bugs squashed: ", 200, 300);
  text("Press the space button to restart!", 200, 200);
  if (kb.pressing(' ')){
    screen = 0;
    timerLength = 30;
  }
}

/*function keyTyped(){
  if (key === ''){
    color = 'green';
  }
}*/

class Character{
  constructor (x,y,height,width,spriteSheets,animations){
    this.sprite = new Sprite (x,y,height,width);
    this.sprite.spriteSheet = spriteSheets;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 7;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('walk');
  }

  /*stop(){

  }*/

  left(){
    this.sprite.changeAni('walk');
    this.sprite.rotation(90)
  }

  right(){
    this.sprite.changeAni('walk');
    this.sprite.rotation(270);
  }

  up(){
    this.sprite.changeAni('walk');
    this.sprite.rotation(0);
  }

  down(){
    this.sprite.changeAni('walk');
    this.sprite.rotation(180);
  }
}