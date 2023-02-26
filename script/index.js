import Overworld from "./classes/Overworld.js"

function init() {
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  
  overworld.init();
};

init()
