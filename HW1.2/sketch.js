let palettes;
let chosenPalette;

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
}

function draw() {
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
}

function mousePressed(){
  let inPalette = false;
  for(let i=0; i < palettes.length; i++){
    if(palettes[i].contains(mouseX,mouseY)){
      chosenPalette = palettes[i].fill;
      inPalette = true;
    }
  }
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

