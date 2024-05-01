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
  [172,227,131],
  [172,227,131],
  [172,227,131],
  [155,103,60],
  [172,227,131],
  

];

const forest = [
  [172,227,131],
  [143,167,104],
  [116,127,74],
  [59,79,48],

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

  if (i==0) {
    // fill(240, 200);
    // lake blue
    const thingsColor = [128,128,128];
    fill(...thingsColor);
  } else if(i==-1){
    const random = getNoiseColor(i, j, things);
    //console.log(random);
    if(random[0]==155){  
      console.log(j);
      fill(...random);
    }else{
      const forestColor = getNoiseColor(i, j, forest);
      fill(...forestColor);
    }
    
  }else {
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

  let n = floor(millis()/1000);
  if (i==0 && /*(n)==(j)*/ j==n) {

    fill(0,0,0);
    beginShape();
    vertex(-tw/1, -10);
    vertex(0, th/2);
    vertex(tw/2, 0);
    vertex(-20, -th-1);
    endShape(CLOSE);
    
    
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
