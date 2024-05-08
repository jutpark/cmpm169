/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "BSOE", 
        assetUrl: "https://cdn.glitch.global/9738f076-4164-4fbc-9c52-57f8f44ed680/BSOE.jpg?v=1715055286102",
        credit: "https://coarchitects.com/projects/science-technology/ucsc-engineering-building/"
      },
      {
        name: "Pringle", 
        assetUrl: "https://cdn.glitch.global/9738f076-4164-4fbc-9c52-57f8f44ed680/Pringles-logo.png?v=1715060617643",
        credit: "Pringles logo: https://www.google.com/url?sa=i&url=https%3A%2F%2F1000logos.net%2Fpringles-logo%2F&psig=AOvVaw3OHBBMXBPNb_d8XQxyfttC&ust=1715146992258000&source=images&cd=vfe&opi=89978449&ved=0CAQQjB1qFwoTCNi-ucvq-oUDFQAAAAAdAAAAABAJ "
      },
      {
        name: "Brick", 
        assetUrl: "https://cdn.glitch.global/9738f076-4164-4fbc-9c52-57f8f44ed680/brick.jpg?v=1715061948571",
        credit: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbrickit.com%2Fproducts%2Fbrick-product-details%2Fplantation-red&psig=AOvVaw1CYtxr97T8wiDwAj74ma7a&ust=1715148304672000&source=images&cd=vfe&opi=89978449&ved=0CAQQjB1qFwoTCICu073v-oUDFQAAAAAdAAAAABAT"
      },
      {
        name: "Xbox", 
        assetUrl: "https://cdn.glitch.global/9738f076-4164-4fbc-9c52-57f8f44ed680/xbox.png?v=1715132781462",
        credit: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.xbox.com%2Fen-us%2F2023%2F08%2F15%2Fxbox-enforcement-strike-system%2F&psig=AOvVaw2vJhfe3Qzy3yFUH6iUIFxH&ust=1715210916162000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjtvtzY_IUDFQAAAAAdAAAAABAT"
      },
    ];
  }
  function initDesign(inspiration) {
    inspiration.image.loadPixels();
  resizeCanvas(inspiration.image.width / 8, inspiration.image.height / 8);
    
    let design = {
      bg: 128,
      fg: []
    }
    
    for(let i = 0; i < 400; i++) {
      design.fg.push({x: random(width),
                      y: random(height),
                      w: random(width/2),
                      h: random(height/2),
                      fill: random(255)})
    }
    return design;
  }
  
  function renderDesign(design, inspiration) {
    
    background(design.bg);
    noStroke();
    for(let box of design.fg) {
      fill(box.fill, 128);
      rect(box.x, box.y, box.w, box.h);
    }
  }
  
  function getColorIndex(xpos, ypos, img) {
    let index = (xpos + ypos * img.width ) * 4;
    let color = [img.pixels[index], img.pixels[index + 1], img.pixels[index + 2], 120];
    return color;
  }
  
  function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    for(let box of design.fg) {
      
      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width/2, rate);
      box.h = mut(box.h, 0, height/2, rate);
  
      box.fill=getColorIndex(floor(box.x*8),floor(box.y*8),inspiration.image);
    }
  }
  
  function mut(num, min, max, rate) {
      return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
  }
  