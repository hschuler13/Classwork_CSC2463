let synth = new Tone.PolySynth(Tone.DuoSynth);


let bend = new Tone.PitchShift();
bend.pitch = 0;
let ppDelay = new Tone.PingPongDelay("4n", 0.5);
let fDelay = new Tone.FeedbackDelay ("8n", 0.5);

synth.connect(bend);
bend.connect(ppDelay);
ppDelay.connect(fDelay);
fDelay.toDestination();

let notes = {
  'a' : 'C3',
  's' : 'D3',
  'd' : 'E3',
  'f' : 'F3',
  'g' : 'G3',
  'h' : 'A3',
  'j' : 'B3',
  'k' : 'C4'
}

let pitchS;
let ppDelayS;
let fDelayS;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);

  pitchS = createSlider(0, 12, 0, 0.1);
  pitchS.position (130,150);
  pitchS.mouseMoved(() => bend.pitch = pitchS.value());

  ppDelayS = createSlider(0., 1., 0.5, 0.05);
  ppDelayS.position(130, 200);
  ppDelayS.mouseReleased(() => {
    ppDelay.delayTime.value = ppDelayS.value();
  })

  fDelayS = createSlider (0, 1, 0, 0.05);
  fDelayS.position (130, 250);
  fDelayS.mouseMoved(() => {fDelay.delayTime.value = fDelayS.value();})
}

function keyPressed(){
  let noteActv = notes[key];
  synth.triggerAttack(noteActv);
}

function keyReleased(){
  let noteActv = notes[key];
  synth.triggerRelease(noteActv, '+0.03');
}

function draw() {
  
  background('CornflowerBlue');
  text('Press the corresponding keys to activate notes:', 200, 20);
  text('A: C3, S: D3, D: E3, F: F3, G: G3, H: A3, J: B3, K: C4', 200, 40);
  text('Use the sliders to alter the note sounds', 200, 100);
  text('Pitch', 200, 140);
  text('Ping Pong Delay', 200, 190);
  text('Feedback Delay', 200, 240);
}
