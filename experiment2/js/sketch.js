// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;
let seed = 239;

const dirtColor = "#76552b";
const shadeColor = "#636363";
const stoneColor = "#858290";
const treeColor = "#33330b";

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);

  background(100);

  noStroke();


  fill(dirtColor);
  rect(0, 0, width, height);



  fill(treeColor);
  const trees = 700*random();
  const scrub = mouseX/width;
  for (let i = 0; i < trees; i++) {
    let z = random();
    let x = width * ((random() + (scrub/50 + millis() / 500000.0) / z) % 1);
    let s = width / 50 / z;
    let y = height / 6 + height / 20 / z;
    let f = y/10;
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
    triangle(x, y - s-f, x - s / 4, y-f, x + s / 4, y-f);
    triangle(x, y - s-(2*f), x - s / 4, y-(2*f), x + s / 4, y-(2*f));
    
  
  }
  /*
  fill(stoneColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 4 - height / 50;
    vertex(x, y);
    vertex(y, x);
    
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  */
  fill(shadeColor);
  beginShape();
  let x = (width*(1/random(1,2)));
  let y = (height*(1/random(1,2)));
  let a = random(1.5,2);
  vertex(x/a,y/a);
  vertex(x/4,y/4);
  vertex(x/2,y/7);
  vertex(x/1.5,y/7);
  vertex(x/1.25,y/1.5);
  vertex(x/1.7,y/1.1);
  vertex(x/2.5,y/1.5);
  vertex(x/a,y/a);
  
  
  
  
  endShape(CLOSE);
  fill(stoneColor);
  beginShape();
  vertex((x/a)+5,y/a);
  vertex(x/4+5,y/4);
  vertex(x/2,y/7+5);
  vertex(x/1.5-5,y/7+5);
  vertex(x/1.25,y/1.5);
  vertex(x/1.7,y/1.1);
  vertex(x/2.5,y/1.5);
  vertex(x/a,y/a);
  
  
  

  endShape(CLOSE);
  
  fill(treeColor);
  let trees2 = 15*random();
  let scrub2 = mouseX/width;
  for (let i = 0; i < trees2; i++) {
    let z = random();
    let x = width * (( (scrub2/50 + millis() / 500000.0) / z) % 1);
    let s = width / 40 / z;
    let y = height / 6 + height / 20 / z;
    let f = y/10;
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
    triangle(x, y - s-f, x - s / 4, y-f, x + s / 4, y-f);
    triangle(x, y - s-(2*f), x - s / 4, y-(2*f), x + s / 4, y-(2*f));
    
  
  }
}


// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}