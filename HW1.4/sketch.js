
/*let beetle;
let font;
let bugs;
let speed;
let howManyBugs;

let bugDirection;
let timerLength = 30;
let deadBugs = 0;
let bugHitBox = 32;*/

let bugs;
let screen = 0;
function preload(){
 beetle = loadImage('assets/beetleV2.png');

 
}

function setup() {
  new Canvas(400, 400);

	bugs = new Group();
  
	/*bugs.color = 'yellow';
	bugs.y = 25;
	bugs.diameter = 10;*/
	
    while (bugs.length < 24) {
      let bug = new bugs.Sprite(random(height), random(width), 32, 32);
      bug.spriteSheet = beetle;
      bug.addAni({
        walkVert: {row: 0, frames: 7},
        standVert: {row: 0, col: 3, frames: 1},
        walkHorz: {row: 1, frames: 7},
        standHorz: {row: 1, col: 3, frames: 1},
        squish: {row: 2, frames: 1}
      });
      
      bug.x = bugs.length * 20;
    }
  
	
  /*createCanvas(400, 400);
  bugs = new Group();
  bugs.spriteSheet = beetle;
  bugs.collider = 'none';
  bugs.anis.frameDelay = 7;
  bugs.life = 1000;
  summonBugs();
  screen = 1;
  deadBugs = 0;
  howManyBugs = 10;*/
  
}

function draw() {
  clear();
  //background(220);
  
  /*if (screen == 1){
    gameStart();
  }
  else if (screen == 2){
    gameEnd();
  }
  else{
    
    gamePlaying();

  }*/
  //drawSprites();
}

/*function gameStart(){
  text("Press the space button to start!", 200, 200);
  if (kb.pressing(' ')){
    screen = 0;
  }
}

function gamePlaying(){
  timer();
  bugsCrawl();
  text("score: " + deadBugs,100,20);
  
}

function gameEnd(){
  bugs.removeAll();
  text("Game end!", 200, 150);
  text("Bugs squashed: ", 200, 300);
  text("Press the space button to restart!", 200, 200);
  if (kb.pressing(' ')){
    screen = 0;
    timerLength = 30;
  }
}

function score(x, y){
  text("Bugs squashed: " + deadBugs, x, y);

}

function timer() {
  text("timer: " + ceil(timerLength),300,20);
  timerLength -= deltaTime/1000;
  if (timerLength < 0){
    screen = 2;
  }
}*/

/*function summonBugs(){
  for (let i = 0; i < howManyBugs; i++){
    let sprite = createSprite(random(width),random(height), 32, 32);

    
  }

  bugs.add(this.sprite);
}*/

/*function summonBugs(){
  for (let i = 0; i < howManyBugs; i++){
   
    sprite = new bugs.Sprite(random(height), random(width), 32, 32);
    
    sprite.addAnis(animations);
    

    bugDirection = random([1,2,3,4]);
    if(bugDirection = 1){
      //left
      sprite.position.x = random(120, width - 120);
      //this.sprite.velocity.y = speed;
      sprite.changeAni('walkHorz');
      sprite.vel.x = -1;
      sprite.scale.x = -1;
      sprite.vel.y = 0;
    }
    else if (bugDirection = 2){
      //right
      sprite.position.x = random(120, width - 120);
      //this.sprite.velocity.y = 0 - speed;
      sprite.changeAni('walkHorz');
      sprite.vel.x = 1;
      sprite.scale.x = 1;
      sprite.vel.y = 0;
    }
    else if (bugDirection = 3){
      //up
      sprite.position.y = random(120, height);
      //this.sprite.velocity.x = speed;
      sprite.changeAni('walkVert');
      sprite.vel.x = 0;
      sprite.scale.y = 1;
      sprite.vel.y = -1;
    }
    else{
      //down
      sprite.position.y = random(120, height);
      //this.sprite.velocity.x = 0 - speed;
      sprite.changeAni('walkVert');
      sprite.vel.x = 0;
      sprite.scale.y = -1;
      sprite.vel.y = 1;
    }

    let kill = false;

    function mouseClicked(){
      if(dist(mouseX, mouseY, sprite.position.x, sprite.position.y) <= bugHitBox){
        sprite.changeAni('squish');
        sprite.vel.x = 0;
        sprite.vel.y = 0;
      }

      if (kill == false){
        deadBugs++;
        howManyBugs--;
      }

      kill = true;
    }

    bugs.add(sprite);
  }
}*/

/*function mouseReleased(){
  if (howManyBugs == 0){
    howManyBugs = howManyBugs + random (5, 15);
    summonBugs();
  }
  else{
    return false;
  }
}*/

/*function left(){

}

function right(){

}

function up(){

}

function down(){

}

function squish(){

}*/

/*function bugsCrawl(){

  for (let i = 0; i < bugs.length; i++){
    if(bugs[i].position.x >= (width + 201)){
      bugs[i].position.x = (0-60);
    }
    else if(bugs[i].position.y >= (height +201)){
      bugs[i].position.y = (0-50);
    }
    else if(bugs[i].position.x <= 0 - 201){
      bugs[i].position.x = (width + 80);
    }
    else if(bugs[i].position.y <= 0 - 201){
      bugs[i].position.y = (height + 70);
    }
  }

}*/

/*class Character{
  constructor (x,y,height,width,spriteSheets,animations){
    this.sprite = new Sprite (x,y,height,width);
    
    
    t
    //switch
    this.sprite.changeAni('standVert');
  }

  stop(){
    
  }

  left(){
    
  }

  right(){
    
  }

  up(){
    
  }

  down(){
    
  }
}*/