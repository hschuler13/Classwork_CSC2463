let player, onGround, tileMap;
let fireEnemy, iceEnemy;
let gameState = 0;
let playerPic, bgPic, topGroundPic, bottomGroundPic, carrotPic, iceBulletPic, fireBulletPic, fireEnemyPic, iceEnemyPic, fireObstaclePic, fireObstacleNullifiedPic, iceObstaclePic, iceObstacleNullifiedPic, iceTriggerPic, fireTriggerPic, activatedTriggerPic;
let groundSize = 34;
let jump = 40;
let level = 1;
let fireBullets, fireBullet;
let iceBullets, iceBullet;
let temp;
let score = 0;
let ground1, ground2, carrot, dirt, water, ice, spike, ash;
let tileMap1, tileMap2, tileMap3;

//add bg music using tonejs
//also use sound effects
//let sounds = new Tone.Players({
  //'paintStroke': "assets/paintStroke.mp3",
  //'paintSplash': "assets/paintSplash.mp3",
  //'paperCrumple': "assets/paperCrumple.mp3",
  //'cameraClick': "assets/cameraClick.mp3"
//});

let synth = new Tone.PolySynth(Tone.MonoSynth);

let startSong = ["C4", "C4", "E4", "C4", "C4", "E4", "C4", "C4", "E4", "F4", "G4", "A4", "G4", "F4"];
let gameSong = ["C3", "D3", "E3", "G3", "C3", "D3", "E3", "A3", "C3", "D3", "E3", "B3", "A3", "G3", "D3", "C3"];
let gameOverSong = [["D#3", "D#4", "D#4"],["C3", "C4", "C4"],["F#3", "F#4", "F#4"]];

const startSeq = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, 0.1, time);
}, startSong);

const gameSeq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, gameSong);

const gameOverSeq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, gameOverSong);

//sounds.toDestination();
synth.toDestination();
Tone.Transport.start();

function preload(){
  playerPic = loadImage('assets/PlayerSpritesheetFinal.png');
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
}

function setup() {
  createCanvas(800, 500);

  //player setup
  player = new Sprite(30,30,80,80);
  player.spriteSheet = playerPic;
  player.rotationLock = true;
  player.friction = 0;
  player.addAnis({
    stand:{row:0, frames:1},
    run:{row:0, frames:7}
  })
  player.ani = 'stand';
  player.w = 90;
  player.h = 90;
  player.scale = 0.4;

  player.debug = true;

  //carrot setup (move to next level)
  carrot = new Group();
  carrot.w = 30;
  carrot.h = 30;
  carrot.image = carrotPic;
  carrot.tile = 'c';
  carrot.collider = 'static';
  carrot.rotationLock = true;

  fireTrigger = new Group();
  fireTrigger.w = 30;
  fireTrigger.h = 30;
  fireTrigger.image = fireTriggerPic;
  fireTrigger.tile = '!';
  fireTrigger.collider = 'static';
  fireTrigger.rotationLock = true;

  iceTrigger = new Group();
  iceTrigger.w = 30;
  iceTrigger.h = 30;
  iceTrigger.image = iceTriggerPic;
  iceTrigger.tile = '?';
  iceTrigger.collider = 'static';
  iceTrigger.rotationLock = true;

  //world setup
  world.autoStep = false;
  world.gravity.y = 12;

  //ground collision setup
  onGround = new Sprite(player.x, player.y + player.h/2, player.w/2, 1);
  onGround.visible = false;
  onGround.mass = 0.1;
  let joint = new GlueJoint(player,onGround);
  joint.visible = false;

  //tile group setup
  walkable = new Group();
  walkable.layer = 1;

  tileSet(ground1,'a',topGroundPic);
  tileSet(ground2,'b',topGroundPic);
  tileSet(dirt,'d',bottomGroundPic);
  tileSet(water,'w',iceObstaclePic);
  tileSet(ice,'e',iceObstacleNullifiedPic);
  tileSet(spike,'s',fireObstaclePic);
  tileSet(ash,'h',fireObstacleNullifiedPic);

  //enemy setup
  fireEnemy = new Group();
  fireEnemy.w = 80;
  fireEnemy.h = 80;
  fireEnemy.scale = 0.4;
  fireEnemy.tile = 'f';
  fireEnemy.rotationLock = true;
  fireEnemy.friction = 0;
  fireEnemy.drag = 0;
  fireEnemy.vel.x = 0.2;
  fireEnemy.spriteSheet = fireEnemyPic;
  fireEnemy.addAnis({
    run:{row:0, frames: 7}
  });

  iceEnemy = new Group();
  iceEnemy.w = 80;
  iceEnemy.h = 80;
  iceEnemy.scale = 0.4;
  iceEnemy.tile = 'i';
  iceEnemy.rotationLock = true;
  iceEnemy.friction = 0;
  iceEnemy.drag = 0;
  iceEnemy.vel.x = 0.2;
  iceEnemy.spriteSheet = iceEnemyPic;
  iceEnemy.addAnis({
    run:{row:0, frames: 7}
  });

  //enemySetup(fireEnemy,'f',fireEnemyPic);
  //enemySetup(iceEnemy,'i',iceEnemyPic);

  //tiles
  tileMap1 = new Tiles([
    'aaa.........aaaaa.........f.......................',
    '....aaaaaaa.......aaaaaaabaaaaab..................',
    '.................................aaa........f.....',
    '..............................f........baaaaaaaaab',
    '.i................i..........baaaaaaab............',
    'baaab.........baaaaaaab...........................',
    'dddddaaaa.........................................',
    'ddddddddda.......................a.....a..........',
    'dddddddddda......................a.....a..........',
    'ddddddddddda.....................a.....a..........',
    'dddddddddddda................a.............a......',
    'ddddd.........................a...........a.......',
    'dddd....ddddddaaa..............aaaaaaaaaaa........',
    'ddd...........dda.................................',
    'dd....ddddddddddda................................',
    'ddd....dddddddddda..............aaa...............',
    'dddd.....dddddddda.............addda..............',
    'ddddd................i........addddda............c',
    'aaaaabaaaaaaaaaaaaaaaaaaaaaaabdddddddaaaaaaaaaaaaa',
    'dddddddddddddddddddddddddddddddddddddddddddddddddd'
    ],
      2000,
      50,
      groundSize-1,
      groundSize-1
    );
    
    /*tileMap2 = 
    
    */

  //bullet setup
  /*fireBullets = new Group();
  fireBullet = createSprite(-1000,0);
  fireBullet.remove();

  iceBullets = new Group();
  iceBullet = createSprite(-1000,0);
  iceBullet.remove();*/

  //player collision setup
  player.overlaps(carrot, (p,c) => {
    level++;
    if(level == 2){
      levelTwo();
    }
    else{
      levelThree();
    }
  });
  player.overlaps(fireEnemy,(p,e) =>{
    player.speed = 0;
    player.x = 30;
    player.y = 30;
  });
  player.overlaps(iceEnemy,(p,e) =>{
    player.speed = 0;
    player.x = 30;
    player.y = 30;
  });

  //ground collision setup
  /*onGround.overlaps(fireEnemy,(s,e) =>{
    if(player.vel.y > 0){
      e.remove();
    }
  });*/
}

function draw() {
  if(gameState == 0){
    background(220);
    text("Press space to start", 400, 250);
    player.visible = false;
    walkable.visible = false;
    carrot.visible = false;
    if(kb.presses('space')){
      gameState = 1;
    }
  }
  else if(gameState == 1){
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
  else {
    background(220);
    text("Game Over!", 400, 250);
    text("Press space to restart", 400, 350);
    player.visible = false;
    walkable.visible = false;
    carrot.visible = false;
    if(kb.presses('space')){
      gameState = 1;
    }
  }
  
}

/*function keyReleased(){
  if(keyCode == 76){
    fireBullet = createSprite(player.x,player.y);
    fireBullet.addImage(fireBulletPic);
    fireBullet.life = 30;
    fireBullet.rotation = player.rotation;
    fireBullet.setSpeed(5,player.rotation);
    fireBullets.add(fireBullet);
  }
}

function bulletRemove(){
  fireBullet.remove();
}

function bulletCollision(){

}*/

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


/*if(onGround.overlapping(spike) || onGround.overlapping(water)){
  player.speed = 0;
  player.x = 40;
  player.y = 100;
  }*/

  if(player.y > 2100){
    player.speed = 0;
    player.x = 2000;
    player.y = 10;
  }
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

function levelTwo(){
  tileMap1.remove();
      tileMap2 = new Tiles([
        'aaa...............................................',
        '...aaaaa..........................................',
        '........aaaaa..f.f..................f.............',
        '..............baaaaaaaaaaaaaaaaaaaaaab............',
        '.............................................sssss',
        '............i.....i.....i..............aaa..addddd',
        '.........baaaaabaaaaabaaaaabaaaaaaaaaa.....a......',
        '.........ddddddddddddddddddddddddddddd......a..i..',
        '....aaa......................................baaab',
        '..................................................',
        '!........aaa......................................',
        'sssss.aaa.........................................',
        'ddddda.......ssssssssssssssssssssssssssss.........',
        '......a......dddddddddddddddddddddddddddd.........',
        '..f..a...................................ss.......',
        'baaab....................................ddss.....',
        '...........................................ddss...',
        '..............f.................i............ddssc',
        'aaaaaaaaaaaaabaaaaaaaaaabaaaabaaaaaaaaaaabaaadddda',
        'dddddddddddddddddddddddddddddddddddddddddddddddddd'
        ],
          2000,
          50,
          groundSize-1,
          groundSize-1
        );
      player.speed = 0;
      player.x = 2000;
      player.y = 50;
}

function levelThree(){
  tileMap2.remove();
  tileMap3 = new Tiles([
    'aaa.............i.................................',
    '.....aaaaaaaa..baaaaaaaaaaaaab....................',
    'i......i........................aaa...............',
    'bbwwwwwbb.........................................',
    '...............................f................f.',
    '........aa.aa.aa.aa.aa.aa.aa...bbsssssssssssssssbb',
    'aaa..i........................f...................',
    '.....bbwwwwwwwwwwwwwwwwwwwwwwwbb..................',
    '.......................................i.........!',
    '..aa.....aaaaaaaaa..................baaaaaaaaaaaba',
    'f....aaa............aasaa...aasaa.................',
    'aaaaa............................................?',
    'ddddd.......................................baaaab',
    'dddddd......aaa.a...a...a...a...a...a.aaa...dddddd',
    'dddddd......ddd...a...a...a...a...a...ddd...dddddd',
    'ddddddd.....dddsssssssssssssssssssssssddd...dddddd',
    'ddddddd.....ddddddddddddddddddddddddddddd...dddddd',
    'ddddddd........f...........f.....................c',
    'dddddddaaaaabaaaaabaaaaabaaaaabaaaaaaaaaawwwwwwwww',
    'dddddddddddddddddddddddddddddddddddddddddddddddddd'
    ],
      2000,
      50,
      groundSize-1,
      groundSize-1
    );
  player.speed = 0;
  player.x = 40;
  player.y = 100;
  tileMap.remove();
}

function enemySetup(e,tileRepresentation,ePic){
  e = new Group();
  e.w = 80;
  e.h = 80;
  e.scale = 0.4;
  e.tile = tileRepresentation;
  e.rotationLock = true;
  e.friction = 0;
  e.drag = 0;
  e.vel.x = 0.2;
  e.spriteSheet = ePic;
  e.addAnis({
    run:{row:0, frames: 7}
  });
}

function tileSet(x,tileRepresentation,tilePic){
  x = new walkable.Group();
  x.w = groundSize;
  x.h = groundSize;
  x.tile = tileRepresentation;
  x.collider = 'static';
  x.image = tilePic;
}