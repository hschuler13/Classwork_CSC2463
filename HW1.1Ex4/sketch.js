function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(27,0,129);
  strokeWeight(5);
  stroke(255);
  fill(41,128,0);
  circle(200,200,175);
  fill(255,0,0);
  beginShape();
  vertex(200,105);
  vertex(225,175);
  vertex(290,175);
  vertex(235,210);
  vertex(255,280);
  vertex(200,240);
  vertex(145,280);
  vertex(165,210);
  vertex(110,175);
  vertex(175,175);
  endShape(CLOSE);
}
