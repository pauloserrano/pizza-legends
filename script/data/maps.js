import GameEntity from "../classes/GameEntity.js"

const maps = {
  DemoRoom: {
    src: Object.freeze({
      bottom: "images/maps/DemoLower.png",
      top: "images/maps/DemoUpper.png"
    }),
    gameEntities: {
      hero: new GameEntity({ 
        position: { x: 4, y: 6 }, 
        src: "images/characters/people/hero.png"
      }),
      npc: new GameEntity({
        position: { x: 1, y: 8 },
        src: "images/characters/people/npc1.png"
      })
    }
  }
}

export default maps