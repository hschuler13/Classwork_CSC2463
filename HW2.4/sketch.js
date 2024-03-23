let palettes;
let chosenPalette;
let clear;
let drawLine = false;
let lineCount = 0;

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
  
  chosenPalette = color('white');
  palettes = [
    new Palette(0,0,color('red')),
    new Palette(0,15,color('orange')),
    new Palette(0,30,color('yellow')),
    new Palette(0,45,color('green')),
    new Palette(0,60,color('cyan')),
    new Palette(0,75,color('blue')),
    new Palette(0,90,color('magenta')),
    new Palette(0,105,color('brown')),
    new Palette(0,120,color('white')),
    new Palette(0,135,color('black')),
  ];

  background(255);
}

function draw() {
  seq.start();

  stroke('black');
  noFill();
  strokeWeight(2);
  rect(0,0,700,400);

  for(let i=0;i < palettes.length;i++) {
    palettes[i].draw();
  }

  if(mouseIsPressed){
    stroke(chosenPalette);
    strokeWeight(5);
    line (mouseX, mouseY, pmouseX, pmouseY);
  } 

  if(lineCount>10){
    seq3.start();
  }
}

function keyPressed(){
  if (keyCode === BACKSPACE){
    sounds.player("paperCrumple").start();
    background(255);
    seq3.stop();
    lineCount = 0;
  }

  else if (keyCode === ENTER){
    sounds.player("cameraClick").start();
    saveCanvas();
  }
}

function mousePressed(){
  let inPalette = false;
  lineCount++;
    soundPaint();
    seq2.start();

  for(let i=0; i < palettes.length; i++){
    if(palettes[i].contains(mouseX,mouseY) && mouseX<15 && mouseY<150){
      inPalette = true;
      chosenPalette = palettes[i].fill;
    }
  }

  if(inPalette){
    soundColSel();
  }

}

function mouseReleased(){
  sounds.player("paintStroke").stop();
  sounds.player("paintSplash").stop();
  seq2.stop();
}

function soundPaint(){
  sounds.player("paintStroke").start();
  sounds.player("paintStroke").loop = true;
}

function soundColSel(){
  sounds.player("paintSplash").start();
  sounds.player("paintSplash").loop = false;
}

class Palette{
  constructor (x, y, fill){
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw(){
    fill(this.fill);
    strokeWeight(1);
    stroke('black');
    square(this.x,this.y,15);
  }

  contains(x,y){
    let inX = x >= this.x && x <= this.x + 100;
    let inY = y >= this.y && y <= this.y +100;
    return inX && inY;
  }
}