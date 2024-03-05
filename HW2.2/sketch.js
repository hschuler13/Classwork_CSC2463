let synth1 = new Tone.PolySynth(Tone.DuoSynth);
let synth2 = new Tone.PolySynth(Tone.Synth);

let bend = new Tone.PitchShift();
bend.pitch = 0;
let ppDelay = new Tone.PingPongDelay(0);
let chor = new Tone.Chorus(0);


synth1.connect(bend);
bend.connect(chor);
chor.connect(ppDelay);
ppDelay.toDestination();

synth2.connect(bend);
bend.connect(chor);
chor.connect(ppDelay);
ppDelay.toDestination();

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

function setup() {
  createCanvas(400, 400);

  sel = createSelect();
  sel.position (100, 50);
  sel.option ('Duo Synth');
  sel.option ('Normal Synth');
  sel.selected ('Normal Synth');

  pitchS = createSlider(0, 12, 0, 0.1);
  pitchS.position (100,200);
  pitchS.mouseMoved(() => bend.pitch = pitchS.value());

  ppDelS = createSlider (0, "16n", 0, 0.1);
  ppDelS.position (100, 150);
  ppDelS.mouseMoved(() => {ppDelay.delayTime.value = ppDelS.value();})

  cS = createSlider (0, 10, 0, 0.1);
  cS.position (100, 250);
  cS.mouseMoved(() => {cS.delayTime.value = cS.value();})
}

function keyPressed(){
  if (sel.selected() === 'Normal Synth'){
  let noteActv = notes[key];
  synth2.triggerAttackRelease(noteActv, 0.8);
  }
  else if(sel.selected() === 'Duo Synth'){
    let noteActv = notes[key];
    synth1.triggerAttackRelease(noteActv, 0.8);
  }
}

/*function keyReleased(){
  let noteActv = notes[key];
  synth.triggerRelease(noteActv, '+0.03');
}*/

function draw() {
  background('CornflowerBlue');
}
