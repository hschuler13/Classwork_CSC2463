let player, onGround, tileMap;
let gameState = 0;
let playerPic, bgPic, topGroundPic, bottomGroundPic, carrotPic, iceBulletPic, fireBulletPic, fireEnemyPic, iceEnemyPic, fireObstaclePic, iceObstaclePic;
let groundSize = 34;
let jump = 40;
//let tileRepresentationArray = ['a','b','c','d'];
//add bg music using tonejs
//also use sound effects
let score = 0;
let ground1, ground2, carrot, dirt, water, ice, spike, ash;

let startSeq;
let gameSeq;
let gameOverSeq;

function preload(){
  //set up sprite player controls through game
  player = new Sprite(30,30,80,80);
  playerPic = loadImage('assets/PlayerSpritesheetFinal.png');
  player.spriteSheet = playerPic;
  player.rotationLock = true;
  player.friction = 0;
  player.addAnis({
    stand:{row:0, frames:1},
    run:{row:0, frames:7}
  })
  player.ani = 'stand';
  
  //load images
  topGroundPic = loadImage('assets/grassBlock.png');
  bottomGroundPic = loadImage('assets/dirtBlock.png');
  carrotPic = loadImage('assets/carrot.png');
  iceBulletPic = loadImage('assets/iceBullet.png');
  fireBulletPic = loadImage('assets/fireBullet.png');
  fireEnemyPic = loadImage('assets/FireEnemySpritesheetFinal.png');
  iceEnemyPic = loadImage('assets/IceEnemySpritesheetFinal.png');
  fireObstaclePic = loadImage('assets/woodenSpikeBlock.png');
  fireObstacleNullifiedPic = loadImage('assets/ashBlock.png');
  iceObstaclePic = loadImage('assets/waterBlock.png');
  iceObstacleNullifiedPic = loadImage('assets/iceBlock.png');
  fireTriggerPic = loadImage('assets/fireTrigger.png');
  iceTriggerPic = loadImage('assets/iceTrigger.png');
  activatedTriggerPic = loadImage('assets/activatedTrigger.png');

  /*carrot = new Group();
  carrot.w = 30;
  carrot.h = 30;
  carrot.image = carrotPic;
  carrot.tile = 'c';
  carrot.collider = 'static';
  carrot.rotationLock = true;*/
}

function setup() {
  createCanvas(800, 500);
  world.autoStep = false;
  world.gravity.y = 12;
  //player.scale = 0.5;
  player.debug = true;
  //adjust hitbox if neccessary
  player.w = 40;
  player.h = 40;
  player.scale = 0.2;
  /*player.overlaps(carrot,(p,c) =>{
    c.remove()
  });*/
  onGround = new Sprite(player.x, player.y + player.h/2, player.w/2, 1);
  onGround.visible = false;
  onGround.mass = 0.1;
  let joint = new GlueJoint(player,onGround);
  joint.visible = false;

  walkable = new Group();
  walkable.layer = 1;

  tileSet(ground1,'a',topGroundPic);
  tileSet(ground2,'b',topGroundPic);
  tileSet(carrot,'c',carrotPic);
  tileSet(dirt,'d',bottomGroundPic);
  tileSet(water,'w',iceObstaclePic);
  tileSet(ice,'e',iceObstacleNullifiedPic);
  tileSet(spike,'s',fireObstaclePic);
  tileSet(ash,'h',fireObstacleNullifiedPic);

  
  /*g1 = new walkable.Group();
  g1.w = groundSize;
  g1.h = groundSize;
  g1.tile = 'a';
  g1.collider = 'static';
  g1.image = topGroundPic;*/

  player.overlaps(carrot, (p,c) => {
    levelTwo();
  });


  enemy = new Group();
  enemy.w = 40;
  enemy.h = 40;
  enemy.scale = 0.5
  enemy.tile = 'x';
  enemy.rotationLock = true;
  enemy.friction = 0;
  enemy.drag = 0;
  enemy.vel.x = 0.2;
  enemy.spriteSheet = iceEnemyPic;
  enemy.addAnis({
    run:{row:0, frames: 7}
  });

  onGround.overlaps(enemy,(s,e) =>{
    if(player.vel.y > 0){
      e.remove();
    }
  });
  player.overlaps(enemy,(p,e) =>{
    player.speed = 0;
    player.x = 30;
    player.y = 30;
  })
  tileMap = new Tiles([
    '..c.aaaa......................',
    '.aaa.....aaaaaaaa.............',
    '..................aaaaaaa.....',
    '...........................aa.',
    '...aaaaa.aaa.aaa.aaa.aaaaa....',
    '.a..x.........................',
    '..baaab.............aaaaa.....',
    '........aaa.aaaaaaa.......aaa.',
    '..............................',
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  ],
    groundSize,
    groundSize,
    groundSize-1,
    groundSize-1
);
}

function draw() {
  if(gameState == 1){
    world.step();
    text('carrots:' + score, 10, 25);
    background(135, 206, 235);
    camera.x = player.x;
    camera.y = player.y;
    player.visible = true;
    walkable.visible = true;
    carrot.visible = true;
    playerMove();
  }
  /*else if(gameState == 2){

  }*/
  else {
    background(220);
    text("Press space to start", 400, 250);
    player.visible = false;
    walkable.visible = false;
    carrot.visible = false;
    if(kb.presses('space')){
      gameState = 1;
    }
  }
  
}

function playerMove(){
  if(kb.pressing('a')){
    player.vel.x = -2;
    player.ani = 'run';
    player.mirror.x = true;
  }
  else if(kb.pressing('d')){
    player.vel.x = 2;
    player.ani = 'run';
    player.mirror.x = false;
  }
  else{
    player.ani = 'stand';
    player.vel.x = 0;
  }

  if(kb.presses('space') && onGround.overlapping(walkable)){
    player.vel.y = jump;
  }

  //adjust for your specific tiles
  /*if(onGround.overlapping(grass) || onGround.overlapping(water)){
    player.drag = 20;
    player.friction = 10;
    jump = 15;
    player.h = 8;
  }*/
  /*else{
    player.drag = 0;
    player.friction = 0;
    jump = 20;
    //player.h = 
  }*/

  if(player.y > 400){
    player.speed = 0;
    player.x = 40;
    player.y = 100;
  }
}

function levelTwo(){
  player.speed = 0;
    player.x = 40;
    player.y = 100;
  tileMap.remove();
  tileMap = new Tiles([
    '..............................',
    '..............................',
    '..............................',
    '..............................',
    '..............................',
    '..............................',
    '..............................',
    '..............................',
    '..............................',
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  ],
    groundSize,
    groundSize,
    groundSize-1,
    groundSize-1
);

}

function enemyMovement(){
  for(e of enemy){
    if(e.overlaps(g2)){
      e.vel.x = -0.2;
    }
    if(e.vel.x < 0){
      e.mirror.x = false;
    }
    else{
      e.mirror.x = true;
    }
  }
}

function tileSet(x,tileRepresentation,tilePic){
  x = new walkable.Group();
  x.w = groundSize;
  x.h = groundSize;
  x.tile = tileRepresentation;
  x.collider = 'static';
  x.image = tilePic;
}