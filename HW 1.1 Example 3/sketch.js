function setup() {
  angleMode(DEGREES);
  createCanvas(130, 60);
}

function draw() {
  background(0);
  noStroke();
  fill(251,250,60);
  arc(30,30,50,50,220,135,PIE);
  fill(218,60,46);
  arc(95,30,50,50,180,0);
  rect(70,30,50,25);
  fill('white');
  circle(82,30,15);
  circle(108,30,15);
  fill(53,59,250);
  circle(82,30,10);
  circle(108,30,10);
}
