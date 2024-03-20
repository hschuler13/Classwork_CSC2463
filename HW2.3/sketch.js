let image;

let bc = new Tone.BitCrusher(8).toDestination();
let synth = new Tone.PolySynth(Tone.AMSynth).connect(bc);

function preload() {
  image = loadImage('sadTrombone.jpg');
}

function setup() {
  createCanvas(400,400);
}

function draw() {
  if (mouseIsPressed === true){
    background(image);
  }
  else{
    background(220);
  }
}

function mousePressed() {
  synth.sync();
  synth.triggerAttackRelease("D4", "8n", 0);
  synth.triggerAttackRelease("C#4", "8n", +.5);
  synth.triggerAttackRelease("C4", "8n", +1);
  synth.triggerAttackRelease("B3", "2n", +1.5);
  Tone.Transport.start();
}

function mouseReleased() {
  Tone.Transport.stop();
  
}