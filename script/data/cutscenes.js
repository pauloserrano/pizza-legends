import Behavior from "../models/Behavior.js"
import { maps, characters } from "./index.js"

// actor, behavior: { type, direction, time, retry=false }, map
export const cutscenes = {
  demo: {
    events: [
      new Behavior({ actor: characters.npc1, type: "walk", direction: "up" }),
      new Behavior({ actor: characters.npc1, type: "walk", direction: "up" }),
      new Behavior({ actor: characters.npc1, type: "walk", direction: "right" }),
      new Behavior({ actor: characters.npc1, type: "walk", direction: "right" }),
      new Behavior({ actor: characters.npc1, type: "walk", direction: "right" }),
      new Behavior({ actor: characters.hero, type: "stand", direction: "left" }),
      new Behavior({ actor: characters.npc1, type: "dialogue", text: "Oh hi, welcome to my demo!" }),
      new Behavior({ actor: characters.npc1, type: "dialogue", text: "Not much to see yet, but feel free to explore." }),
    ]
  }
}
