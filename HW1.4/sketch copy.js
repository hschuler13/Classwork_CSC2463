let openScreen, backgroundPic, bugGroup, bug, splatImage, counter, bugNumber, time, gameState, timerIsDone, serial, inData, outData;

let totalTime = 45;
let bugSprites = [];
let bugSpeed = 2;
let sensorData = {};


function preload() {
  backgroundPic = loadImage("background.jpg");
  splatImage = loadImage("BugSprite_4.png");
  openScreen = loadImage("Open Screen.png");

  for (let i = 1; i < 4; i++) {
    bugSprites[i - 1] = loadImage("BugSprites" + i + ".png");
  }

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  bugGroup = new Group();
  makeBugs();
  gameState = "start";
  //timerIsDone = false;
  counter = 0;
  bugNumber = 0;
}


function makeBugs() {
  for (let j = 0; j < bugNumber; j++) { //makes more bugs
    bug = createSprite(random([0 - 170, width + 190]), random([0 - 170, height + 190]), 10, 10);

    let bugAnimation = bug.addAnimation("walking", bugSprites[0], bugSprites[1], bugSprites[0], bugSprites[2]); //gives them walking animation

    let splatAnimation = bug.addAnimation("splat", "BugSprite_4.png");
    //makes 'squished' image appear on bug
    bug.rotation = random([0, 90, 180, 270]); //gives bug direction up, down, left, or right.

    if (bug.rotation == 180) {
      bug.position.x = random(120, width - 120);
      bug.velocity.y = bugSpeed;
    } else if (bug.rotation == 0) {
      bug.position.x = random(120, width - 120);
      bug.velocity.y = 0 - bugSpeed;
    } else if (bug.rotation == 90) {
      bug.position.y = random(120, height);
      bug.velocity.x = bugSpeed;
    } else {
      bug.position.y = random(120, height);
      bug.velocity.x = 0 - bugSpeed;
    }

    bug.isSquish = false;

    bug.onMousePressed = function() {
      this.changeAnimation("splat");
      this.velocity.x = 0;
      this.velocity.y = 0;

      if (this.isSquish == false) {
        counter++;
        bugNumber--;
      }
      this.isSquish = true; //tells the system that the bug is dead

    }
    bug.scale = 0.5;
    bugGroup.add(bug);
  }
}


function draw() {
  background(backgroundPic);


  if (gameState == "start") {

    fill("lightgray");
    rect((width / 2) - 200, (height / 2) - 50, 400, 100, 10, 10, 10, 10);
    fill("black");
    text("                                                   Bug Squish!\n   Click on as many bugs as possible to squish them before time runs out\n                                            Click anywhere to start!", (width / 2 - 200), (height / 2) - 15);

    if (mouseIsPressed) {
      gameState = "play";
      startTime = millis();
    }

  } else if (gameState == "play") {
    bugMove();

    text("Score: " + counter, 10, 15);
    text("Time Left: " + (totalTime - timer()), 10, 60);
    if (timerIsDone == true) {
      gameState = "end";
    }
  } else if (gameState == "end") {
    bugGroup.removeSprites();

    fill("lightgray");
    rect((width / 2) - 150, (height / 2) - 50, 300, 100, 10, 10, 10, 10);
    fill("black");
    text("GAME OVER!", (width / 2) - 40, (height / 2) - 20);
    text("Score: " + counter, (width / 2) - 35, height / 2);
    text("Click on me to play again!", (width / 2) - 80, (height / 2) + 40)

    /*if (mouseIsPressed == true) {
      if (mouseX > (width / 2) - 150 && mouseX < (width / 2) + 150 && mouseY > (height / 2) - 50 && mouseY < (height / 2) + 50) {
        setup();
      }
    }*/
  }

  drawSprites();

}


function bugMove() {

  for (let j = 0; j < bugGroup.length; j++) {
    if (bugGroup[j].position.x >= (width + 201)) {
      bugGroup[j].position.x = (0 - 60);
    } else if (bugGroup[j].position.y >= (height + 201)) {
      bugGroup[j].position.y = (0 - 50);
    } else if (bugGroup[j].position.x <= 0 - 201) {
      bugGroup[j].position.x = (width + 80);
    } else if (bugGroup[j].position.y <= 0 - 201) {
      bugGroup[j].position.y = (height + 70);
    }
  }
}


function mouseReleased() {
  if (bugNumber == 0) {
    bugNumber = bugNumber + random([1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 5, 4, 6, 8, 9, 10, 13, 17, 20]);
    makeBugs();
  } else {
    return false;
  }

}

/*function timer() { 
  time = int((millis() - startTime) / 1000);
  if (time > totalTime) {
    timerIsDone = true;
  }
  return time;
}*/
