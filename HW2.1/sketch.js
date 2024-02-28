let sounds = new Tone.Players({
  'running': "assets/running.mp3",
  'vineBoom': "assets/vineBoom.mp3",
  'policeAnnouncement': "assets/policeAnnouncement.mp3",
  'windowBreak': "assets/windowBreak.mp3"
});
let ppDelay = new Tone.PingPongDelay("4n", 0.5);
let ppDelaySlide;
let button1, button2, button3, button4;

sounds.connect(ppDelay);
ppDelay.toDestination();

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);

  button1 = createButton('Running');
  button1.position(100, 50);
  button1.mousePressed(() => sounds.player("running").start());

  button2 = createButton('Window break');
  button2.position(200, 50);
  button2.mousePressed(() => sounds.player("windowBreak").start());

  button3 = createButton('Police');
  button3.position(100, 100);
  button3.mousePressed(() => sounds.player("policeAnnouncement").start());

  button4 = createButton('Boom');
  button4.position(200, 100);
  button4.mousePressed(() => sounds.player("vineBoom").start());

  ppDelaySlide = createSlider(0., 1., 0.5, 0.05);
  ppDelaySlide.position(100, 200);
  ppDelaySlide.mouseReleased(() => {
    ppDelay.delayTime.value = ppDelaySlide.value();
  })
}

function draw() {
  background('LightCoral');
  text("Ping pong delay adjustment slider", 185, 190);
}