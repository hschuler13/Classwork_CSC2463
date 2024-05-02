let playerX = 400;
let playerY = 375;
let playerWidth = 30; //set these when you have drawn your sprites
let playerHeight = 70;

let platformX = 200; //change these when you make your own custom platforms
let platformY = 300;
let platform2X = 600;
let platform2Y = 300;
let platform3X = 500;
let platform3Y = 150;
let platformWidth = 200;
let platformHeight = 40;

let carrotX = 600;
let carrotY = 400;
let carrot2X = 600;
let carrot2Y = 250;
let carrot3X = 500;
let carrot3Y = 100;
let carrot4X = 200;
let carrot4Y = 250;
let carrotWidth = 30;
let carrotHeight = 30;

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
let carrot;
//place background later

let score = 0;
let lives = 3;
let timer = 0;

//premade sounds
let sounds = new Tone.Players({
  'playerJump': "assets/jump.mp3",
  'playerShoot': "assets/shoot.mp3",
  'playerWalk': "assets/walk.mp3",
  'poof': "assets/poof.mp3"
});
sounds.toDestination();
//sounds made by me :3

let pixelFont;

function preload(){
  playerSprite = loadImage('assets/player_1.png');
  carrot = loadImage('assets/carrot.png');
  pixelFont = loadFont('assets/PixelifySans-Regular.ttf');
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
    startScreen();
  }
  else if(gameStateLevel == 1){
    playState();
  }
  if (mouseIsPressed == true){
    gameStateLevel = 1;
  }
}

function startScreen(){
  background(220);

  textFont(pixelFont);
  fill(255);
  strokeWeight(10);
  stroke(0);
  textSize(100);
  text("Cold as Fire", width/2, height/2);
  text("Click mouse to start", width/2, 300);
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

  //score
  textFont(pixelFont);
  fill(255);
  strokeWeight(10);
  stroke(0);
  textSize(20);
  text("Score: ", 100, 50);
  text(score, 120, 50);

  //platform
  stroke(0);
  strokeWeight(5);
  fill(255,120,0);
  rect(platformX,platformY,platformWidth,platformHeight);
  rect(platform2X,platform2Y,platformWidth,platformHeight);
  rect(platform3X,platform3Y,platformWidth,platformHeight);

  //carrot
  image(carrot,carrotX,carrotY,carrotWidth,carrotHeight);
  if(playerX >= carrotX-carrotWidth/2 && playerX <= carrotX+carrotWidth/2 && playerY >= carrotY-carrotHeight/2 && playerY <= carrotY+carrotHeight/2){
    score++;
    carrotX = 900
    //add carrot sound effect when you collect it
  }

  image(carrot,carrot2X,carrot2Y,carrotWidth,carrotHeight);
  if(playerX >= carrot2X-carrotWidth/2 && playerX <= carrot2X+carrotWidth/2 && playerY >= carrot2Y-carrotHeight/2 && playerY <= carrot2Y+carrotHeight/2){
    score++;
    carrot2X = 900
    //add carrot sound effect when you collect it
  }

  image(carrot,carrot3X,carrot3Y,carrotWidth,carrotHeight);
  if(playerX >= carrot3X-carrotWidth/2 && playerX <= carrot3X+carrotWidth/2 && playerY >= carrot3Y-carrotHeight/2 && playerY <= carrot3Y+carrotHeight/2){
    score++;
    carrot3X = 900
    //add carrot sound effect when you collect it
  }

  image(carrot,carrot4X,carrot4Y,carrotWidth,carrotHeight);
  if(playerX >= carrot4X-carrotWidth/2 && playerX <= carrot4X+carrotWidth/2 && playerY >= carrot4Y-carrotHeight/2 && playerY <= carrot4Y+carrotHeight/2){
    score++;
    carrot3X = 900
    //add carrot sound effect when you collect it
  }
  //character
  stroke(0);
  fill(150,0,170);
  //rect(playerX,playerY,playerWidth,playerHeight);
  image(playerSprite,playerX,playerY,playerWidth,playerHeight);

  //collisions
  if(playerX >= platformX - platformWidth/2 && playerX <= platformX + platformWidth/2 && playerY + playerHeight >= platformY - platformHeight/2 && playerY + playerHeight >= platformY + platformHeight/2 && gravityJump == false){
    playerY = platformY - 55;
    gravityPlayerVelocity = 0;
    jumpCounter = 0;
  }

  if(playerX >= platform2X - platformWidth/2 && playerX <= platform2X + platformWidth/2 && playerY + playerHeight >= platform2Y - platformHeight/2 && playerY + playerHeight >= platform2Y + platformHeight/2 && gravityJump == false){
    playerY = platformY - 55;
    gravityPlayerVelocity = 0;
    jumpCounter = 0;
  }

  if(playerX >= platform3X - platformWidth/2 && playerX <= platform3X + platformWidth/2 && playerY + playerHeight >= platform3Y - platformHeight/2 && playerY + playerHeight >= platform3Y + platformHeight/2 && gravityJump == false){
    playerY = platformY - 55;
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
