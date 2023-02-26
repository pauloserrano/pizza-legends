import Character from "../classes/Character.js"

const maps = {
  DemoRoom: {
    src: Object.freeze({
      bottom: "images/maps/DemoLower.png",
      top: "images/maps/DemoUpper.png"
    }),
    gameEntities: {
      hero: new Character({ 
        position: { x: 4, y: 6 }, 
        src: "images/characters/people/hero.png",
        isBeingControlled: true
      }),
      npc: new Character({
        position: { x: 1, y: 8 },
        src: "images/characters/people/npc1.png"
      })
    }
  }
}

export default maps