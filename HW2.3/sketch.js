let image;

//let synth = new Tone.PolySynth(Tone.DuoSynth);
//let bitC = new Tone.BitCrusher(4);

//synth.connect(bitC);
//bitC.toDestination();
//synth.toDestination();

//D4
//C#4
//C4
//B3

function preload() {
  image = loadImage('StarMario.png');
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
}

function draw() {
  if (mouseIsPressed === true){
    background(image);
  }
  else{
    background(220);
    text ('Press mouse for a surprise!', 200, 200);
  }
}

/*function mousePressed() {
  synth.triggerAttack('D4');
  synth.triggerAttack('C#4');
  synth.triggerAttack('C4');
  synth.triggerAttack('B3');
  Tone.Transport.start();
}*/
