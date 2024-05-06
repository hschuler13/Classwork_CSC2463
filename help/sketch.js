// This example is also available online in the p5.js web editor:
// https://editor.p5js.org/gohai/sketches/X0XD9xvIR

let port;
let connectBtn;
let joyX = 0, temp = 0, sw = 0, buttonVal = 0, buttonVal2 = 0;

function setup() {
  createCanvas(400, 400);
  background(220);

  port = createSerial();

  // in setup, we can open ports we have used previously
  // without user interaction

  let latest = port.readUntil("\n");
  let values = latest.split(",");
  if (values.length > 4) {
    joyX = values[0];
    sw = Number(values[1]);
    temp = values[2];
    buttonVal = Number(values[3]);
    buttonVal2 = Number(values[4]);
  }
  text(joyX, 100, 100);
  text(sw, 100, 125);
  text(temp, 100, 150);
  text(buttonVal, 100, 175);
  text(buttonVal2, 100, 200);

  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);

  let sendBtn = createButton('Send hello');
  sendBtn.position(220, 200);
  sendBtn.mousePressed(sendBtnClick);
}

function draw() {
  // this makes received text scroll up
  copy(0, 0, width, height, 0, -1, width, height);

  // reads in complete lines and prints them at the
  // bottom of the canvas
  /*let str = port.readUntil("\n");
  if (str.length > 0) {
    text(str, 10, height-20);
  }*/

  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}

function sendBtnClick() {
  port.write("Hello from p5.js\n");
}

/*
let port;
let joyX = 0, temp = 0, sw = 0, buttonVal = 0, buttonVal2 = 0;
let connectButton;
let circleX, circleY;
let speed = 3;
let specialMoveReady = 1;

function setup() {
  port = createSerial();
  createCanvas(400, 400);
  //circleX = width / 2;
  //circleY = height / 2;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  frameRate(20);
}

function draw() {
  background(220);


  // let characters = port.available();
  // let str = port.read(characters);
  // let lines = str.split("\n");
  // let latest = "";
  // if (lines.length > 0) {
  //   let lastIndex = lines.length > 1 ? lines.length-2 : lines.length - 1;
  //   latest = lines[lastIndex];
  // }
  let latest = port.readUntil("\n");
  let values = latest.split(",");
  if (values.length > 4) {
    joyX = values[0];
    sw = Number(values[1]);
    temp = values[2];
    buttonVal = Number(values[3]);
    buttonVal2 = Number(values[4]);
  }
  text(joyX, 100, 100);
  text(sw, 100, 125);
  text(temp, 100, 150);
  text(buttonVal, 100, 175);
  text(buttonVal2, 100, 200);

  port.write(specialMoveReady);

  /*if (port.opened() && frameCount % 3 == 0) {
    let pixel = get(circleX, circleY);
    console.log(pixel);
    let message = `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
    port.write(message);
  }*/

  /*stroke(0);
  if (sw == 1) {
    fill("blue");
  }
  else {
    fill (255);
  }
  circle(circleX, circleY, 5);*/
//}

/*function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}*/