let port;
let canvas;
let color = [0, 0, 0];

function setup() {
  port = createSerial();
  canvas = createCanvas(400, 400);
  circleDiameter = 25;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  frameRate(60);
}

function draw() {
  background(220);
  let str = port.readUntil("\n");
  circleDiameter = str;
  circle(200,200,circleDiameter);

  if (port.opened() && frameCount % 3 == 0) {
    let message = `${color[0]} ${color[1]} ${color[2]}\n`;
    port.write(message);
  }
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

function mousePressed(){
    for (let i = 0; i< color.length; i++){
      color[i] = random(0,256);
    }
}

