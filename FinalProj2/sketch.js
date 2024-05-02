let player, onGround;
let gameState = 0;
let playerPic, bgPic, topGroundPic, bottomGroundPic, carrotPic, iceBulletPic, fireBulletPic, fireEnemyPic, iceEnemyPic, fireObstaclePic, iceObstaclePic;

function preload(){
  player = new Sprite(30,30,400,250);
  playerPic = loadImage('bunny.png');
  player.spriteSheet = playerPic;
  player.rotationLock = true;
  player.friction = 0;
  player.addAnis({
    stand:{row:0, frames:1},
    run:{row:0, frames:7}
  })
  player.ani = 'stand';
  //load images here with loadImage();
  /*
  bgPic = loadImage('assets/placeholder.png');
  topGroundPic = loadImage('assets/placeholder.png');
  bottomGroundPic = loadImage('assets/placeholder.png');
  carrotPic = loadImage('assets/placeholder.png');
  iceBulletPic = loadImage('assets/placeholder.png');
  fireBulletPic = loadImage('assets/placeholder.png');
  fireEnemyPic = loadImage('assets/placeholder.png');
  iceEnemyPic = loadImage('assets/placeholder.png');
  fireObstaclePic = loadImage('assets/placeholder.png');
  iceObstaclePic = loadImage('assets/placeholder.png');
  */
}

function setup() {
  createCanvas(800, 500);
  world.autoStep = false;
  world.gravity.y = 12;
  //player.scale = 0.5;
  player.debug = true;

  onGround = new Sprite(player.x, player.y + player.h/2, player.w/2, 1);
  onGround.visible = false;
  onGround.mass = 0.1;
  let joint = new GlueJoint(player,onGround);
  joint.visible = false;
}

function draw() {
  background(220);
}

/*function keyPressed(){
  
}*/
