"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

const things = [
  [128,128,128],
  [155,103,60],
  [88,57,39],
  [38,25,25],
];
const forest = [
  [172,227,131],
  [143,167,104],
  [116,127,74],
  [59,79,48],
  [78,130,120],
];
const colorScale = 0.1;

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function getNoiseColor(x, y, colorArray) {
  // Generate a noise value based on x and y
  let noiseValue = noise(x * colorScale, y * colorScale); 

  // Map the noise value to an index in the color array
  let index = floor(map(noiseValue, 0, 1, 0, colorArray.length));

  // Retrieve and return the selected color from the array
  return colorArray[index];
}

function p3_drawTile(i, j) {
  noStroke();

  if (XXH.h32("tile:" + [i, j], worldSeed) % 30 == 0) {
    // fill(240, 200);
    // lake blue
    const thingsColor = getNoiseColor(i, j, things);
    fill(...thingsColor);
  } else {
    // fill(255, 200);
    // spring green
    const forestColor = getNoiseColor(i, j, forest);
    fill(...forestColor);
  }

  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {

    
    translate(0, -10);
    stroke(0, 0, 100, 128);
    line(0,0,0,20);
    line(0,7,8,10);
    line(0,7,-8,10);
    line(0,20,10,40);
    line(0,20,-10,40);
    
    stroke(0,0,0,0);
    
    fill(255, 255, 100, 256);
    ellipse(0, 0, 10, 10);
    fill(0, 0, 0);
    ellipse(2, 0, 2, 2);
    ellipse(-2, 0, 2, 2);
    
    
  }

  pop();
}


function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
