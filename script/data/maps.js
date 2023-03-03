import Map from "../classes/Map.js"
import { characters } from "./index.js"

export const maps = {
  DemoRoom: new Map({
    gameEntities: [characters.hero, characters.npc1, characters.npc2],
    src:{
      bottom: "images/maps/DemoLower.png",
      top: "images/maps/DemoUpper.png"
    },
    walls: [[7, 6], [7, 7], [8, 6], [8, 7], [1, 1], [1, 2], [1, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 10], [2, 10], [3, 10], [4, 10], [4, 11], [5, 11], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 9], [11, 8], [11, 7], [11, 6], [11, 5], [11, 4], [10, 3], [9, 3], [8, 4], [8, 3], [8, 2], [7, 1], [6, 2], [6, 3], [6, 4], [5, 3], [4, 3], [3, 3], [2, 3], [1, 3]]
  })
}
