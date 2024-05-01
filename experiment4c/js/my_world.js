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
  [136,140,141],
  [173,216,230],
];
const forest = [
  [91,135,49],
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
  
  const forestColor = getNoiseColor(i, j, forest);
    fill(...forestColor);
  

  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;

  if (n % 5 == 1) {

    fill(things[1]);
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);


  }else if(n % 5 == 2){
    fill(things[2]);
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);
  }else if(n % 5 == 3){
    fill(things[2]);
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);
    fill(things[3]);
    square(0,0,3);
    square(-8,8,3);
    square(8,-8,3);
    square(-8,-8,3);
    square(0,8,3);
    square(4,-8,3);

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
