// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

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
  background(220);    
  // call a method on the instance
  myInstance.myMethod();

  // Set up rotation for the rectangle
  push(); // Save the current drawing context
  translate(centerHorz, centerVert); // Move the origin to the rectangle's center
  rotate(frameCount / 100.0); // Rotate by frameCount to animate the rotation
  fill(234, 31, 81);
  noStroke();
  rect(-125, -125, 250, 250); // Draw the rectangle centered on the new origin
  pop(); // Restore the original drawing context

  // The text is not affected by the translate and rotate
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text("p5*", centerHorz - 105, centerVert + 40);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}


let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "tilesetP8.png"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
}


function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}


function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      let k = noise(i / 50, j / 30);
      if (abs(k - 0.5) < 0.05) {
        row.push("l");
      } else {
        let innerValue = noise(i / 10, j / 10);
        if (innerValue > 0.5) {
          row.push("_");
        } else {
          row.push(".");
        }
      }
    }
    grid.push(row);
  }

  return grid;
}

function drawGrid(grid) {

  background(128);
  const g = 10;
  const t = millis() / 1000.0;
  let f = 0;
  let l = 0;
  let r=0;
  let c = 0;
  let h = 0;
  let b=0;

  noStroke();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      placeTile(i, j, (4 * pow(noise(t / 5, i, j / 2 + t), 3)) | 0.5, 13);

      if (gridCheck(grid, i, j, "_")) {
        placeTile(i, j, (4 * pow(random(), g)) | 0, 1);
        if(random(1)>0.99){
          f=i;
          l=j;
          r=1;
        }
      } else {
        drawContext(grid, i, j, "l", 9, 3, true);
      }

      if (gridCheck(grid, i, j, ".")) {
        placeTile(i, j, (4 * pow(random(), g)) | 0, 0);
        if(random(1)>0.99){
          c=i;
          h=j;
          b=1;
        }
      } else {
        drawContext(grid, i, j, ".", 4, 0);
      }
    }
  }
  if(b==1){
    placeTile(c, h, (1 * pow(random(), g)) | 26, 0);
  }
  if(r==1){
    placeTile(f, l, (1 * pow(random(), g)) | 17, 0);
  }
}

function drawContext(grid, i, j, target, dti, dtj, invert = false) {
  let code = gridCode(grid, i, j, target);
  if (invert) {
    code = ~code & 0xf;
  }
  let [ti,tj] = lookup[code];
  placeTile(i, j, dti + ti, dtj + tj);
}



function gridCode(grid, i, j, target) {
  return (
    (gridCheck(grid, i - 1, j, target) << 0) +
    (gridCheck(grid, i, j - 1, target) << 1) +
    (gridCheck(grid, i, j + 1, target) << 2) +
    (gridCheck(grid, i + 1, j, target) << 3)
  );
}

function gridCheck(grid, i, j, target) {
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
    return grid[i][j] == target;
  } else {
    return false;
  }
}

const lookup = [
  [1, 1],
  [1, 0], // bottom
  [0, 1], // right
  [0, 0], // right+bottom
  [2, 1], // left
  [2, 0], // left+bottom
  [1, 1],
  [1, 0], // * 
  [1, 2], // top
  [1, 1],
  [0, 2], // right+top
  [0, 1], // *
  [2, 2], // top+left
  [2, 1], // *
  [1, 2], // *
  [1, 1]
];


