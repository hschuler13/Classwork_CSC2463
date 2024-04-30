let palettes;
let paletteColors;
let colorLED = [0, 0, 0];
let chosenPalette;
let clear;
let drawLine = false;
let lineCount = 0;
let circleX, circleY;
let speed = 3;
let port;
let joyX = 0, JoyY = 0, sw = 0;
let saveB = 0, clearB = 0, selectB = 0;

let sounds = new Tone.Players({
  'paintStroke': "assets/paintStroke.mp3",
  'paintSplash': "assets/paintSplash.mp3",
  'paperCrumple': "assets/paperCrumple.mp3",
  'cameraClick': "assets/cameraClick.mp3"
});

let synth = new Tone.PolySynth(Tone.MonoSynth);

let defaultSong = ["C4", "G4", "A4", "G4"];
let paintingSong = ["C6", "G6", "A6", "G6"];
let tenLineSong = ["C2", "G2", "A2", "G2"];

const seq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, defaultSong);

const seq2 = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, paintingSong);

const seq3 = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, tenLineSong);

sounds.toDestination();
synth.toDestination();
Tone.Transport.start();

function setup() {
  createCanvas(700, 400);
  circleX = width / 2;
  circleY = height / 2;
  port = createSerial();
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  chosenPalette = 0;

  palettes = [
    new Palette(0, 0, color('red')),
    new Palette(0, 15, color('orange')),
    new Palette(0, 30, color('yellow')),
    new Palette(0, 45, color('green')),
    new Palette(0, 60, color('cyan')),
    new Palette(0, 75, color('blue')),
    new Palette(0, 90, color('magenta')),
    new Palette(0, 105, color('brown')),
    new Palette(0, 120, color('white')),
    new Palette(0, 135, color('black')),
  ];

  paletteColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'cyan',
    'blue',
    'magenta',
    'brown',
    'white',
    'black'
  ];

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }
  frameRate(60);
  background(255);
}

function draw() {
  stroke('black');
  noFill();
  strokeWeight(2);
  rect(0, 0, 700, 400);

  for (let i = 0; i < palettes.length; i++) {
    palettes[i].draw();
  }

  seq.start();
  seq2.start();
  seq3.start();

  let str = port.readUntil("\n");
  let values = str.split(",");
  if (values.length > 5) {
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]);
    saveB = Number(values[3]);
    clearB = Number(values[4]);
    selectB = Number(values[5]);
    //text(values, 100, 100);

    if (joyX > 0) {
      circleX += speed;
    } else if (joyX < 0) {
      circleX -= speed;
    }

    if (joyY > 0) {
      circleY += speed;
    } else if (joyY < 0) {
      circleY -= speed;
    }

  }

  noStroke();
  fill(paletteColors[chosenPalette]);
  circle(circleX, circleY, 10);

  if (saveB == 1) {
    sounds.player("cameraClick").start();
    saveCanvas();
  }
  if (clearB == 1) {
    sounds.player("paperCrumple").start();
    circleX = width / 2;
    circleY = height / 2;
    background(255);
    lineCount = 0;
  }
  if (selectB == 1) {
    chosenPalette++;
    if (chosenPalette == 10) {
      chosenPalette = 0;
    }
  }

  if (port.opened()) {
    let message = `${255} ${0} ${0}\n`;
    switch (chosenPalette) {
      case 0:
        message = `${255} ${0} ${0}\n`;
        break;
      case 1:
        message = `${255} ${100} ${0}\n`;
        break;
      case 2:
        message = `${255} ${255} ${0}\n`;
        break;
      case 3:
        message = `${0} ${255} ${0}\n`;
        break;
      case 4:
        message = `${0} ${255} ${255}\n`;
        break;
      case 5:
        message = `${0} ${0} ${255}\n`;
        break;
      case 6:
        message = `${128} ${0} ${128}\n`;
        break;
      case 7:
        message = `${139} ${69} ${19}\n`;
        break;
      case 8:
        message = `${255} ${255} ${255}\n`;
        break;
      case 9:
        message = `${0} ${0} ${0}\n`;
        break;
    }
    port.write(message);
  }
}

function soundPaint() {
  sounds.player("paintStroke").loop = true;
  sounds.player("paintStroke").start();
  
}

function soundColSel() {
  sounds.player("paintSplash").start();
  sounds.player("paintSplash").loop = false;
}

class Palette {
  constructor(x, y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw() {
    fill(this.fill);
    strokeWeight(1);
    stroke('black');
    square(this.x, this.y, 15);
  }

  contains(x, y) {
    let inX = x >= this.x && x <= this.x + 100;
    let inY = y >= this.y && y <= this.y + 100;
    return inX && inY;
  }
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}