let sprite;
let characters = [];

function preload(){
  
  let animations = {
    stand: {row:0, frames:1},
    walkRight: {row:0 , col:1, frames:8}
  };
  
  characters.push(new Character(200,100,80,80,'libraries/assets/SpelunkyGuy.png',animations));
  characters.push(new Character(200,200,80,80,'libraries/assets/Green.png',animations));
  characters.push(new Character(200,300,80,80,'libraries/assets/Robot.png',animations));
}

function setup(){
  createCanvas(400,400);
}

function draw() {
  background(0);
  characters.forEach((character) => {
    if (kb.pressing('d')){
      character.right();
    }
    else if (kb.pressing('a')){
      character.left();
    }
    else{
      character.stop();
    }
    
    if (character.sprite.x + character.sprite.width/4 > width){
      character.left();
    }
    else if (character.sprite.x - character.sprite.width/4 < 0){
      character.right();
    }
  });
}

class Character{
  constructor (x,y,height,width,spriteSheets,animations){
    this.sprite = new Sprite (x,y,height,width);
    this.sprite.spriteSheet = spriteSheets;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('stand');
  }

  stop(){
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni('stand');
  }

  right(){
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.scale.x = 1;
    this.sprite.vel.y = 0;
  }

  left(){
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.scale.x = -1;
    this.sprite.vel.y = 0;
  }
}
