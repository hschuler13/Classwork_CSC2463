let player, onGround, tileMap;
let fireEnemy, iceEnemy;
let gameState = 0;
let playerPic, bgPic, topGroundPic, bottomGroundPic, carrotPic, iceBulletPic, fireBulletPic, fireEnemyPic, iceEnemyPic, fireObstaclePic, fireObstacleNullifiedPic, iceObstaclePic, iceObstacleNullifiedPic, iceTriggerPic, fireTriggerPic, activatedTriggerPic;
let groundSize = 34;
let jump = 40;
let level = 1;
let fireBullets, fireBullet;
let iceBullets, iceBullet;
let temp = 0;
let score = 0;
let ground1, ground2, carrot, dirt, water, ice, spike, ash;
let tileMap1, tileMap2, tileMap3;
let timer = 0;
let specialVal = 1;
let specialValString = "READY";

//arduino variables
let port;
let connectBtn;
let joyX = 0, sw = 0, buttonVal = 0, buttonVal2 = 0;

//setup of sound portion of project

let synth = new Tone.PolySynth(Tone.MonoSynth);

let startSong = ["C4", "C4", "E4", "C4", "C4", "E4", "C4", "C4", "E4", "F4", "G4", "A4", "G4", "F4"];
let gameSong = ["C3", "D3", "E3", "G3", "C3", "D3", "E3", "A3", "C3", "D3", "E3", "B3", "A3", "G3", "D3", "C3"];
let gameOverSong = [["D#3", "D#4", "D#4"], ["C3", "C4", "C4"], ["F#3", "F#4", "F#4"]];
let victorySong = ["A3", "B3", "C3", "B3", "A3", "F4", "E4"]

const startSeq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, startSong);

const gameSeq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, gameSong);

const gameOverSeq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, gameOverSong);

const victorySeq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, victorySong);

synth.toDestination();
Tone.Transport.start();

function preload() {
  //load all images used (all are drawn by me)
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
  gameFont = loadFont('assets/PixelifySans-Regular.ttf');
}

function setup() {
  createCanvas(800, 500);

  //text formatting
  textFont(gameFont);
  textAlign(CENTER);
  fill(255);
  stroke(0);

  //player setup
  player = new Sprite(30, 30, 80, 80);
  player.spriteSheet = playerPic;
  player.rotationLock = true;
  player.friction = 0;
  player.addAnis({
    stand: { row: 0, frames: 1 },
    run: { row: 0, frames: 7 }
  })
  player.ani = 'stand';
  player.w = 70;
  player.h = 70;
  player.scale = 0.3;

  //carrot setup (move to next level)
  carrot = new Group();
  carrot.w = 30;
  carrot.h = 30;
  carrot.image = carrotPic;
  carrot.tile = 'c';
  carrot.collider = 'static';
  carrot.rotationLock = true;

  //trigger setup (to make obstacles safe to traverse)
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

  //setup of the obstacles in question
  spike = new Group();
  spike.w = groundSize;
  spike.h = groundSize;
  spike.tile = 's';
  spike.collider = 'static';
  spike.image = fireObstaclePic;

  water = new Group();
  water.w = groundSize;
  water.h = groundSize;
  water.tile = 'w';
  water.collider = 'static';
  water.image = iceObstaclePic;

  //world setup
  world.autoStep = false;
  world.gravity.y = 12;

  //ground collision setup
  onGround = new Sprite(player.x, player.y + player.h / 2, player.w / 2, 1);
  onGround.visible = false;
  onGround.mass = 0.1;
  let joint = new GlueJoint(player, onGround);
  joint.visible = false;

  //setup of tiles used to indicate to enemies when they turn and walk the other direction
  ground2 = new Group();
  ground2.w = groundSize;
  ground2.h = groundSize;
  ground2.tile = 'b';
  ground2.collider = 'static';
  ground2.image = topGroundPic;

  //tile group setup
  walkable = new Group();
  walkable.layer = 1;

  tileSet(ground1, 'a', topGroundPic);
  tileSet(dirt, 'd', bottomGroundPic);

  //enemy setup
  fireEnemy = new Group();
  fireEnemy.w = 80;
  fireEnemy.h = 80;
  fireEnemy.scale = 0.3;
  fireEnemy.tile = 'f';
  fireEnemy.rotationLock = true;
  fireEnemy.friction = 0;
  fireEnemy.drag = 0;
  fireEnemy.vel.x = 1;
  fireEnemy.spriteSheet = fireEnemyPic;
  fireEnemy.addAnis({
    run: { row: 0, frames: 7 }
  });

  iceEnemy = new Group();
  iceEnemy.w = 80;
  iceEnemy.h = 80;
  iceEnemy.scale = 0.3;
  iceEnemy.tile = 'i';
  iceEnemy.rotationLock = true;
  iceEnemy.friction = 0;
  iceEnemy.drag = 0;
  iceEnemy.vel.x = 1;
  iceEnemy.spriteSheet = iceEnemyPic;
  iceEnemy.addAnis({
    run: { row: 0, frames: 7 }
  });
  iceEnemy.debug = true;
  fireEnemy.debug = true;

  //tiles for level 1
  tileMap1 = new Tiles([
    'aaa.........aaaaa.........f.......................',
    '....aaaaaaa.......aaaaaaabaaaaab..................',
    '.................................aaa........f.....',
    '..............................f........aaaabaaaaab',
    '.i................i..........baaaaaaab............',
    'baaab.........baaaaaaab...........................',
    'dddddaaaa.........................................',
    'ddddddddda.......................a.....a..........',
    'dddddddddda......................a.....a..........',
    'ddddddddddda.....................a.....a..........',
    'dddddddddddda................a.............a......',
    'ddddd.........................a...........a.......',
    'dddd....ddddddaaa..............aaaaaaaaaaa........',
    'ddd...........ddd.................................',
    'dd....ddddddddddda................................',
    'ddd....ddddddddddd..............aaa...............',
    'dddd.....ddddddddd.............addda..............',
    'ddddd.....................i...addddda............c',
    'dddddaaaaaaaaaaaaaaaaaabaaaaabdddddddaaaaaaaaaaaaa',
    'dddddddddddddddddddddddddddddddddddddddddddddddddd'
  ],
    2000,
    50,
    groundSize - 1,
    groundSize - 1
  );

  //bullet setup
  fireBullets = new Group();
  fireBullet = createSprite(-1000, 0);
  fireBullet.remove();

  iceBullets = new Group();
  iceBullet = createSprite(-1000, 0);
  iceBullet.remove();

  //player collision setup
  player.overlaps(carrot, (p, c) => {
    level++;
    if (level == 2) {
      synth.triggerAttackRelease("C3", "8n");
      levelTwo();
    }
    else if (level == 3) {
      synth.triggerAttackRelease("C3", "8n");
      levelThree();
    }
    else {
      victorySeq.start();
      gameState = 3;
    }
  });
  player.overlaps(fireEnemy, (p, e) => {
    gameState = 2;
  });
  player.overlaps(iceEnemy, (p, e) => {
    gameState = 2;
  });

  //ground collision setup
  onGround.overlaps(fireEnemy, (s, e) => {
    if (player.vel.y > 0) {
      gameState = 2;
    }
  });
  onGround.overlaps(iceEnemy, (s, e) => {
    if (player.vel.y > 0) {
      gameState = 2;
    }
  });
  onGround.overlaps(spike, (s, e) => {
    if (spike.image == fireObstaclePic) {
      gameState = 2;
    }
  });
  onGround.overlaps(water, (s, e) => {
    if (water.image == iceObstaclePic) {
      gameState = 2;
    }
  });

  //communication with arduino setup
  port = createSerial();

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(0, 2100);
  connectBtn.mousePressed(connectBtnClick);
}


function draw() {
  //start sound elements of project
  Tone.start();

  //read arduino serial monitor
  let latest = port.readUntil("\n");
  let values = latest.split(",");
  if (values.length > 2) {
    joyX = values[0];
    sw = Number(values[1]);
    temp = values[2];
    buttonVal = values[3];
    buttonVal2 = values[4];
  }

  
  if (port.opened() && frameCount % 3 == 0) {
    port.write(special);
  }

  //bullet mirroring to match player's direction
  /*if (fireBullet.mirror.x == true) {
    
  }
  else {
    
  }*/

  //starting screen
  if (gameState == 0) {
    //song of the starting screen
    startSeq.start();

    //setup color and text of the starting screen
    background(186, 85, 211);
    textSize(100);
    text("Cold as fire", width / 2, 200);
    textSize(25);
    text("Press SWITCH to start", width / 2, 100);

    //no assets appear on the screen unwanted
    player.visible = false;
    walkable.visible = false;
    carrot.visible = false;
    iceEnemy.visible = false;
    fireEnemy.visible = false;
    ground2.visible = false;
    spike.visible = false;
    water.visible = false;
    fireTrigger.visible = false;
    iceTrigger.visible = false;

    //press joystick switch
    if (sw == 1) {
      //move to playing screen
      gameState = 1;
    }
  }

  //playing screen
  else if (gameState == 1) {
    //stop other songs, 
    startSeq.stop();
    gameOverSeq.stop();
    gameSeq.start();

    //start world
    world.step();

    //timer variable, counts up and measures how long player has been playing
    timer = floor(millis()/1000);

    //stats displayed
    background(135, 206, 235);
    textSize(10);
    text('score: ' + score, 20, 25);
    text('timer: ' + timer, 20, 50);
    text('level: ' + level, 20, 75);

    //press button, shoot bullet
    if (buttonVal == 1) {
      fireBullet = createSprite(player.x, player.y);
      fireBullet.life = 50;
      fireBullet.scale = 0.3;
      if (temp > 80) {
        fireBullet.addImage(fireBulletPic);
      }
      else {
        fireBullet.addImage(iceBulletPic);
      }
      if (player.mirror.x == true) {
        fireBullet.mirror.x = true;
        fireBullet.x -= 5;
      }
      else {
        fireBullet.mirror.x = false;
        fireBullet.x += 5;
      }
      fireBullets.add(fireBullet);

      if(buttonVal2 == 1){
        spike.image = fireObstacleNullifiedPic;
      }
    }

    //camera follows player
    camera.x = player.x;
    camera.y = player.y;

    //now assets can be visible
    player.visible = true;
    walkable.visible = true;
    carrot.visible = true;
    iceEnemy.visible = true;
    fireEnemy.visible = true;
    ground2.visible = true;
    spike.visible = true;
    water.visible = true;
    fireTrigger.visible = true;
    iceTrigger.visible = true;

    //make player and enemies move, as well as enable bullet collisions
    playerMovement();
    iceEnemyMovement();
    fireEnemyMovement();
    bulletCollision();
  }

  //game over screen
  else if (gameState == 2) {

    //stop all other songs and play game song
    gameSeq.stop();
    startSeq.stop();
    gameOverSeq.start();

    //setup background 
    background(220, 20, 60);
    textSize(100);
    text("Game Over!", 400, 250);
    textSize(25);
    text("Press SWITCH to restart", 400, 350);

    //assets dissapear
    player.visible = false;
    walkable.visible = false;
    carrot.visible = false;
    iceEnemy.visible = false;
    fireEnemy.visible = false;
    ground2.visible = false;
    spike.visible = false;
    water.visible = false;
    fireTrigger.visible = false;
    iceTrigger.visible = false;

    //press switch, restart current level
    if (sw == 1) {
      gameState = 1;
      player.x = 2000;
      player.y = 20;
    }
  }

  //victory screen
  else {
    //stop all other songs, play the victory song
    gameSeq.stop();
    startSeq.stop();
    victorySeq.start();

    //assets dissapear
    player.visible = false;
    walkable.visible = false;
    carrot.visible = false;
    iceEnemy.visible = false;
    fireEnemy.visible = false;
    ground2.visible = false;
    spike.visible = false;
    water.visible = false;
    fireTrigger.visible = false;
    iceTrigger.visible = false;

    //setup background color and text
    textSize(100);
    background(60, 179, 113);
    text("you win!", width / 2, height / 2);
  }

}

//bullet collisions with obstacle triggers and enemies
function bulletCollision() {
  if (fireBullet.image == fireBulletPic) {
    fireBullet.overlaps(iceEnemy, (s, e) => {
      synth.triggerAttackRelease("C4", "8n");
      score += 100;
      e.remove();
      fireBullet.remove();
    });
    fireBullet.overlaps(fireTrigger, (s, e) => {
      if (fireTrigger.image == fireTriggerPic) {
        synth.triggerAttackRelease("C2", "8n");
        spike.image = fireObstacleNullifiedPic;
        fireTrigger.image = activatedTriggerPic;
        fireBullet.remove();
      }
    });

  }
  else {
    fireBullet.overlaps(fireEnemy, (s, e) => {
      synth.triggerAttackRelease("C4", "8n");
      score += 100;
      e.remove();
      fireBullet.remove();
    });
    fireBullet.overlaps(iceTrigger, (s, e) => {
      if (iceTrigger.image == iceTriggerPic) {
        synth.triggerAttackRelease("C2", "8n");
        water.image = iceObstacleNullifiedPic;
        iceTrigger.image = activatedTriggerPic;
        fireBullet.remove();
      }
    });
  }
}

//movement of player
function playerMovement() {
  if (joyX > 10) {
    player.vel.x = -2;
    player.ani = 'run';
    player.mirror.x = true;
  }
  else if (joyX < -10) {
    player.vel.x = 2;
    player.ani = 'run';
    player.mirror.x = false;
  }
  else {
    player.ani = 'stand';
    player.vel.x = 0;
  }

  if (sw == 1 && (onGround.overlapping(walkable) || onGround.overlapping(spike) || onGround.overlapping(water))) {
    player.vel.y = jump;
  }

  if (player.y > 2100) {
    player.speed = 0;
    player.x = 2000;
    player.y = 20;
  }
}

//movement of ice enemies
function iceEnemyMovement() {
  for (e of iceEnemy) {
    if (e.overlaps(ground2)) {
      e.vel.x *= -1;
    }
    if (e.vel.x < 0) {
      e.mirror.x = true;
    }
    else {
      e.mirror.x = false;
    }
  }
}

//movement of fire enemies
function fireEnemyMovement() {
  for (e of fireEnemy) {
    if (e.overlaps(ground2)) {
      e.vel.x *= -1;
    }
    if (e.vel.x < 0) {
      e.mirror.x = true;
    }
    else {
      e.mirror.x = false;
    }
  }
}

//connect to arduino via button
function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}

//setup level 2
function levelTwo() {
  tileMap1.remove();
  gameState = 1;
  spike.image = fireObstaclePic;
  tileMap2 = new Tiles([
    'aaa...............................................',
    '...aaaaa..........................................',
    '........aaaaa.........f.....f.....f...............',
    '..............aaaaabaaaaabaaaaabaaaaab............',
    '.............................................sssss',
    '............i.....i.....i..............aaa..addddd',
    '.........baaaaabaaaaabaaaaabaaaaaaaaaa.....a......',
    '.........ddddddddddddddddddddddddddddd......a.....',
    '....aaa......................................aaaaa',
    '..................................................',
    '!........aaa......................................',
    'sssss.aaa.........................................',
    'ddddda.......ssssssssssssssssssssssssssss.........',
    '......a......dddddddddddddddddddddddddddd.........',
    '.....a..................................dss.......',
    'aaaaa...................................dddss.....',
    '..........................................dddss...',
    '................f...............i...........dddssc',
    'aaaaaaaaaaaaabaaaaabaaaaaaaaabaaaaabaaaaaaaaadddda',
    'dddddddddddddddddddddddddddddddddddddddddddddddddd'
  ],
    2000,
    50,
    groundSize - 1,
    groundSize - 1
  );
  player.speed = 0;
  player.x = 2000;
  player.y = 20;
}

//setup level 3
function levelThree() {
  tileMap2.remove();
  gameState = 1;
  spike.image = fireObstaclePic;
  water.image = iceObstaclePic;
  fireTrigger.image = fireTriggerPic;
  tileMap3 = new Tiles([
    'aaa...............i..............................',
    '.....aaaaaaaa..baaaaabaaaaaaaa....................',
    '................................aaa...............',
    'aawwwwwaa.........................................',
    '..................................................',
    '........aa.aa.aa.aa.aa.aa.aa...aasssssssssssssssaa',
    'aaa...............................................',
    '.....aawwwwwwwwwwwwwwwwwwwwwwwaa..................',
    '.......................................i.........!',
    '..aa.....aaaaaaaaa..................baaaaabaaaaaaa',
    '.....aaa............aasaa...aasaa.................',
    'baaaaab.......................................i...',
    'ddddddd.................................?..baaaaab',
    'dddddd......aaa.a...a...a...a...a...a.aaa..ddddddd',
    'dddddd......ddd...a...a...a...a...a...ddd..ddddddd',
    'ddddd.......dddsssssssssssssssssssssssddd..ddddddd',
    'ddddd.......ddddddddddddddddddddddddddddd..ddddddd',
    'ddddd..........f.....f.....f.....................c',
    'dddddddaaaaabaaaaabaaaaabaaaaabaaaaaaaaaawwwwwwwww',
    'dddddddddddddddddddddddddddddddddddddddddddddddddd'
  ],
    2000,
    50,
    groundSize - 1,
    groundSize - 1
  );
  player.speed = 0;
  player.x = 2000;
  player.y = 20;
}

//function to setup tile player walks on
function tileSet(x, tileRepresentation, tilePic) {
  x = new walkable.Group();
  x.w = groundSize;
  x.h = groundSize;
  x.tile = tileRepresentation;
  x.collider = 'static';
  x.image = tilePic;
}