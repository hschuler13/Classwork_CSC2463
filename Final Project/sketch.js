let playerX = 400;
let playerY = 375;
let playerWidth = 50; //set these when you have drawn your sprites
let playerHeight = 50;

let platformX = 200; //change these when you make your own custom platforms
let platformY = 300;
let platformWidth = 200;
let platformHeight = 40;

let gameStateLevel = 0;

let gravityJump = false;
let gravityPlayerDirection = 1;
let gravityPlayerVelocity = 2;
let gravityJumpHeight = 15;
let gravityFallSpeed = 2;
let gravityGroundHeight = 375;
let gravitySkyHeight = 50;
let gravityJumpCount = 0;

let playerSprite;
let platformBlock;
//place background later

//premade sounds
let sounds = new Tone.Players({
  'playerJump': "assets/jump.mp3",
  'playerShoot': "assets/shoot.mp3",
  'playerWalk': "assets/walk.mp3",
  'poof': "assets/poof.mp3"
});
sounds.toDestination();
//sounds made by me :3


function preload(){
  playerSprite = loadImage('assets/player_1.png');
}

function setup() {
  createCanvas(800, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  //grass = new Sprite();
}

function draw() {
  keyPressed();
  keyTyped();
  gravity();
  if(gameStateLevel == 0){
    playState();
  }
}

function playState(){
  //background
  background(150,230,240);
  
  //grass
  noStroke();
  fill(100,200,75);
  rect(width/2,450,width,100);
  /*grass.width = 800;
  grass.height = 100;
  grass.color = 'green';
  grass.x = 400;
  grass.y = 450;
  push();*/

  //border
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2,height/2,width,height);

  //platform
  stroke(0);
  strokeWeight(5);
  fill(255,120,0);
  rect(platformX,platformY,platformWidth,platformHeight);

  //character
  stroke(0);
  fill(150,0,170);
  //rect(playerX,playerY,playerWidth,playerHeight);
  image(playerSprite,playerX,playerY,playerWidth,playerHeight);

  //collisions
  if(playerX >= platformX - platformWidth/2 && playerX <= platformX + platformWidth/2 && playerY + playerHeight >= platformY - platformHeight/2 && playerY + playerHeight >= platformY + platformHeight/2 && jump == false){
    playerY = playerY;
    gravityPlayerVelocity = 0;
    jumpCounter = 0;
  }
}

function keyPressed(){
  if(kb.pressing('a')){
    playerX -= 5;
    sounds.player('playerWalk').start;
  }
  if(kb.pressing('d')){
    playerX += 5;
    sounds.player('playerWalk').start;
  }
  /*else if(keyDown('UP_ARROW')){
    playerY = playerY + 5;
  }
  else if(keyDown('DOWN_ARROW')){
    playerY = playerY - 5;
  }*/
}

function keyTyped(){
  if(kb.pressing('s')){
    gravityJump = true;
    sounds.player('playerJump').start;
  }
  else {
    gravityJump = false;
  }
}

function gravity(){
  if(playerY >= gravityGroundHeight && gravityJump == false){
    playerY = playerY;
    gravityJumpCount = 0;
  }
  else{
    playerY += (gravityPlayerDirection*gravityPlayerVelocity);
  }
  
  if(gravityJump == true){
    if(playerY <= gravitySkyHeight || gravityJumpCount >= gravityJumpHeight){
      if(playerY >= gravityGroundHeight){
        playerY = gravityGroundHeight
      }
      else{
        gravityPlayerVelocity = gravityFallSpeed;
      }
    }
    else{
      gravityPlayerVelocity -= gravityJumpHeight;
      gravityJumpCount++;
    }  
  }
  else{
    gravityPlayerVelocity = gravityFallSpeed;
  }
}
