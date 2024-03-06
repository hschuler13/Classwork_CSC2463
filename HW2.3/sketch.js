function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
}

function draw() {
  if (mouseIsPressed === true){
    background('pink');
  }
  else{
    background(220);
    text ('Press mouse for a surprise!', 200, 200);
  }
}
