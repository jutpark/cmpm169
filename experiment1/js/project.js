// project.js - purpose and description here
// Author: Justin Park
// Date: 4/6/2024

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
function main() {
const fillers = {
  Units: ["Azir", "Hwei", "Irelia", "Lissandra", "Rakan", "Sett", "Udyr", "Wukong", "Xayah", "Annie", "Ashe", "Galio", "kaisa", "Kayn", "Lee Sin", "Lilia", "Morgana", "Nautilus", "Ornn", "Sylas", "Syndra", "Alune", "Amumu", "Aphelios", "Bard", "Diana", "Illaoi", "Soraka", "Tahm kench", "Thresh", "Tristana", "Volibear", "Yone", "Zoe", "Aatrox", "Gnar", "janna", "Kindred", "Lux", "neeko", "Qiyana", "Riven", "Senna","Shen", "Teemo", "Yorick", "Zyra", "Ahri", "Caitlyn", "Cho'Gath", "Darius", "Garen", "Jax", "Kha'Zix", "Kobuko", "Kog'Maw", "Malphite", "Reksai", "Sivir", "yasuo" ],
  Classes: ["Altruist", "Arcanist", "Artist", "behemoth", "Bruiser", "Duelist", "Exalted", "Great", "Invoker", "Lovers", "Reaper", "Sage","Sniper", "Spirit Walker", "Trickshot", "Warden" ],
  Origin: ["DragonLord", "Dryad", "Fated","Fortune", "Ghostly", "Heavenly", "Inkshadow", "Mythic", "Porcelain", "StoryWeaver", "Umbral"],
  
};

const template = `Hi! Heres ur TFT comp to play

On your final board it must contain at least 1 $Units.
It should also have the $Classes and the $Origin trait active.

Good luck on top 4'ing with these! 
`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  box.innerText = story;
}

/* global clicker */
clicker.onclick = generate;

generate();
}
main();
