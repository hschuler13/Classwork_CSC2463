let a, b, c, d, e, f, g, h, i, j;
let timerLength;
let screen;
let deadBugs;
let bugSpeed;
let beetle;
let animations;
let bugDirection;
let bugs;
let timerLengthB;
let howManyBugs;
let clicker;
let clicked;
let font;

function preload() {
  beetle = loadImage("assets/beetleV2.png");
  //font = loadFont("assets/pixelifysans-regular.ttf")
  animations = {
    walkVert: { row: 0, frames: 7 },
    standVert: { row: 0, col: 3, frames: 1 },
    walkHorz: { row: 1, frames: 7 },
    standHorz: { row: 1, col: 3, frames: 1 },
    squish: { row: 2, frames: 1 }
  };
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
  //textFont(font);
  noCursor();
  screen = 1;
  deadBugs = 0;
  howManyBugs = 0;
  clickTrue = false;
  bugSpeed = 0.5;
  clicker = new Sprite();
  clicker.diameter = 20;
  clicker.color = 'Crimson';
  noStroke();
  bugs = new Group();
  clicked = false;
}

function draw() {
  background('LawnGreen');
  clicker.x = mouseX;
  clicker.y = mouseY;
  switch (screen) {
    case 1:
      gameStart();
      break;
    case 2:
      gameEnd();
      break;
    default:
      gamePlaying();
  }
}

function summonBugs(n) {
  n = new Sprite(random(height), random(width), 32, 32);
  n.spriteSheet = beetle;
  n.addAnis(animations);
  n.ani.frameDelay = 7;
  n.collider = 'none';
  bugs.add(n);
  howManyBugs++;

  bugDirection = random([1, 2, 3, 4]);

  if (bugDirection == 1) {
    n.changeAni('walkHorz');
    n.vel.y = 0;
    n.vel.x = bugSpeed * -1;
    n.scale.x = -1;
  }
  else if (bugDirection == 2) {
    n.changeAni('walkHorz');
    n.vel.y = 0;
    n.vel.x = bugSpeed;
    n.scale.x = 1;
  }
  else if (bugDirection == 3) {
    n.changeAni('walkVert');
    n.vel.y = bugSpeed * -1;
    n.vel.x = 0;
    n.scale.y = 1;
  }
  else if (bugDirection == 4) {
    n.changeAni('walkVert');
    n.vel.y = bugSpeed;
    n.vel.x = 0;
    n.scale.y = -1;
  }

  

}

function mouseClicked() {
  if (clicker.overlapping(bugs)) {
    clicked = true;
    deadBugs++;
    howManyBugs--;
    bugSpeed = bugSpeed + 0.2;
  }
}

function mouseReleased() {
  clicked = false;
}

function gameStart() {
  text("There is a beetle infestation in your yard!", 200, 150);
  text("Click on the beetles to crush them", 200, 170);
  text("Press the space button to start", 200, 200);
  if (kb.pressing(' ')) {
    screen = 0;
    timerLength = 30;
    timerLengthB = 3;
  }
}

function gameEnd() {
  bugs.removeAll();
  text("Game over!", 200, 150);
  score(200, 170);
  text("Press space to restart", 200, 200);
  if (kb.pressing(' ')) {
    screen = 0;
    deadBugs = 0;
    timerLength = 30;
    bugSpeed = 0.5;
    clicked = false;
  }
}

function gamePlaying() {
  score(100, 20);
  timer();
  while (howManyBugs < 11) {
    summonBugs(a);
    summonBugs(b);
    summonBugs(c);
    summonBugs(d);
    summonBugs(e);
    summonBugs(f);
    summonBugs(g);
    summonBugs(h);
    summonBugs(i);
    summonBugs(j);
  }
}

function score(x, y) {
  text("Bugs squashed: " + deadBugs, x, y);
}

function timer() {
  timerLength -= deltaTime / 1000;
  text("Timer: " + ceil(timerLength), 300, 20);
  if (timerLength < 0) {
    screen = 2;
  }

  timerLengthB -= deltaTime / 1000;
  if (timerLengthB < 1) {
    bugs.removeAll();
    howManyBugs = 0;
    timerLengthB = 3;
  }
}

