let SpelunkyGuy;
let Green;
let Robot;

function preload(){
  SpelunkyGuy = new Sprite (200, 100, 80, 80);
  SpelunkyGuy.spriteSheet = 'assets/spelunkyguy.png';
  let animations = {
    stand: {row:0, frames:1},
    walkRight: {row:0 , col:1, frames:8}
  };
  SpelunkyGuy.collider = 'none';
  SpelunkyGuy.anis.frameDelay = 8;
  SpelunkyGuy.addAnis(animations);
  SpelunkyGuy.changeAni('walkRight');

  Green = new Sprite (200, 200, 80, 80);
  Green.spriteSheet = 'assets/green.png';
  Green.collider = 'none';
  Green.anis.frameDelay = 8;
  Green.addAnis(animations);
  Green.changeAni('walkRight');

  Robot = new Sprite (200, 300, 80, 80);
  Robot.spriteSheet = 'assets/robot.png';
  Robot.collider = 'none';
  Robot.anis.frameDelay = 8;
  Robot.addAnis(animations);
  Robot.changeAni('walkRight');

  SpelunkyGuy = new Character(500,500,80,80,'assets/spelunkyguy.png',animations);
  Green = new Character(200,200,80,80,'assets/green.png',animations);
  Robot = new Character(200,300,80,80,'assets/robot.png',animations);
}

function setup(){
  createCanvas(400,400);
}

function draw() {
  background(0);
    if (kb.pressing('right')) {
      walkRight();
    } 
    else if (kb.pressing('left')) {
      walkLeft();
    } 
    else{
      stop();
    }
    if (SpelunkyGuy.x + SpelunkyGuy.width/4 > width) {
      walkLeft();
    } else if (SpelunkyGuy.x - SpelunkyGuy.width/4 < 0) {
      walkRight();
    }
    if (Green.x + Green.width/4 > width) {
      walkLeft();
    } else if (Green.x - Green.width/4 < 0) {
      walkRight();
    }
    if (Robot.x + Robot.width/4 > width) {
      walkLeft();
    } else if (Robot.x - Robot.width/4 < 0) {
      walkRight();
    }
  
}

function stop() {
  SpelunkyGuy.vel.x = 0;
  SpelunkyGuy.vel.y = 0;
  SpelunkyGuy.changeAni('stand');

  Green.vel.x = 0;
  Green.vel.y = 0;
  Green.changeAni('stand');

  Robot.vel.x = 0;
  Robot.vel.y = 0;
  Robot.changeAni('stand');
}

function walkRight() {
  SpelunkyGuy.changeAni('walkRight');
  SpelunkyGuy.vel.x = 1;
  SpelunkyGuy.scale.x = 1;
  SpelunkyGuy.vel.y = 0;

  Green.changeAni('walkRight');
  Green.vel.x = 1;
  Green.scale.x = 1;
  Green.vel.y = 0;

  Robot.changeAni('walkRight');
  Robot.vel.x = 1;
  Robot.scale.x = 1;
  Robot.vel.y = 0;
}

function walkLeft() {
  SpelunkyGuy.changeAni('walkRight');
  SpelunkyGuy.vel.x = -1;
  SpelunkyGuy.scale.x = -1;
  SpelunkyGuy.vel.y = 0;

  Green.changeAni('walkRight');
  Green.vel.x = -1;
  Green.scale.x = -1;
  Green.vel.y = 0;

  Robot.changeAni('walkRight');
  Robot.vel.x = -1;
  Robot.scale.x = -1;
  Robot.vel.y = 0;
}

class Character{
  constructor(x, y, height, width, spriteSheets, animations){
    sprite = new Sprite (x, y, height, width);
    sprite.spriteSheet = spriteSheets;
    sprite.collider = 'none';
    sprite.anis.frameDelay = 8;
    sprite.addAnis(animations);
    sprite.changeAni('stand');
  }
}