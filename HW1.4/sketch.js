let sprite;
let beetle;
function preload(){

}

function setup() {
  createCanvas(400, 400);
  /*let color = 'green';
  let gameEndBoo;
  let score;
  let time;*/

  let animations = {
    walk: {row: 0, frames: 7},
    squish: {row: 1, frames: 1}
  }
  beetle = new Character (200,200,32,32,'assets/beetle(1).png',animations);
  //gameStart();
}

function draw() {
  background(220);
  
  //gameStart();

}

/*function gameStart(){
  text("Press the space button to start!", 200, 200);
}

function gamePlaying(){

}

function gameEnd(){
  text("Game end!", 200, 150);
  text("Score: ", 200, 300);
  text("Press the space button to restart!", 200, 200);
}

function keyTyped(){
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
}