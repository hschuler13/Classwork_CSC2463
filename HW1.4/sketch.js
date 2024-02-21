
/*let beetle;
let font;
let bugs;
let speed;

let timerLength = 30;
let deadBugs = 0;
let bugHitBox = 32;*/

let bugs;
let screen = 1;
let bugGenerator = 25;
let howManyBugs = 0;
let bugDirection;

function preload(){
 beetle = loadImage('assets/beetleV2.png');

 
}

function setup() {
  createCanvas(400, 400);

	bugs = new Group();
  
	/*bugs.color = 'yellow';
	bugs.y = 25;
	bugs.diameter = 10;*/
	
    

    if (bugGenerator < 25){
      bugGenerator = 25;
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
  background(220);
  summonBugs();
  if (bugs.cull(400)){
    bugGenerator = 25;
  }
  clear();
  
  
    //gameStart();
  
  
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

function gameStart(){
  bugs.removeAll();
  //text("Press the space button to start!", 200, 200);
  if (kb.pressing(' ')){
    screen = 0;
  }
}

function gamePlaying(){
  bugs.draw();
  //timer();
  //bugsCrawl();
  //text("score: " + deadBugs,100,20);
  
}

/*function gameEnd(){
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

}*/

function timer() {
  /*text("timer: " + ceil(timerLength),300,20);
  timerLength -= deltaTime/1000;
  if (timerLength < 0){
    screen = 2;
  }*/
}

/*function summonBugs(){
  for (let i = 0; i < howManyBugs; i++){
    let sprite = createSprite(random(width),random(height), 32, 32);

    
  }

  bugs.add(this.sprite);
}*/

function summonBugs(){
  while (bugs.length < 25){
    while (bugGenerator > 0) {
      let bug = new bugs.Sprite(random(height), random(width), 32, 32);
      bug.spriteSheet = beetle;
      bug.collider = 'none';
      bug.layer = 2;
      
      bug.addAnis({
        walkVert: {row: 0, frames: 7},
        standVert: {row: 0, col: 3, frames: 1},
        walkHorz: {row: 1, frames: 7},
        standHorz: {row: 1, col: 3, frames: 1},
        squish: {row: 2, frames: 1}
      });
      bug.anis.frameDelay = 7;
  
      function left(){
        bug.changeAni('walkHorz');
        bug.vel.y = 0;
        bug.vel.x = -1;
        bug.scale.x = -1;
      }
      
      function right(){
        bug.changeAni('walkHorz');
        bug.vel.y = 0;
        bug.vel.x = 1;
        bug.scale.x = 1;
      }
      
      function up(){
        bug.changeAni('walkVert');
        bug.vel.y = -1;
        bug.vel.x = 0;
        bug.scale.y = 1;
      }
      
      function down(){
        bug.changeAni('walkVert');
        bug.vel.y = 1;
        bug.vel.x = 0;
        bug.scale.y = -1;
      }
  
      bugDirection = random([1,2,3,4]);
      if (bugDirection == 1){
        left();
      }
      else if (bugDirection == 2){
        right();
      }
      else if (bugDirection == 3){
        up();
      }
      else if (bugDirection == 4){
        down();
      }

      if (bug.mouse.presses()){
        bug.changeAni('squish');
        bug.vel.x = 0;
        bug.vel.y = 0;
        bug.cull(10);
      }
      howManyBugs++;
      bugGenerator--;

      
    }

    
  }
    
 
    /*let kill = false;

    function mouseClicked(){
      
    }
  }*/
}

function mouseCLicked(){
  let kill = false;
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

/*function mouseReleased(){
  if (howManyBugs == 0){
    howManyBugs = howManyBugs + random (5, 15);
    summonBugs();
  }
  else{
    return false;
  }
}*/



function squish(){

}

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