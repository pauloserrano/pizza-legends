import Behavior from "../models/Behavior.js"
import { characters } from "./index.js"

export const cutscenes = {
  demo: {
    events: [
      new Behavior({ actor: characters.npc1, type: "walk", direction: "right" }),
      new Behavior({ actor: characters.npc1, type: "walk", direction: "right" }),
      new Behavior({ actor: characters.npc1, type: "walk", direction: "right" }),
      new Behavior({ actor: characters.hero, type: "stand", direction: "left" }),
      new Behavior({ actor: characters.npc1, type: "dialogue", text: "Oh hi, welcome to my demo!" }),
      new Behavior({ actor: characters.npc1, type: "dialogue", text: "Not much to see yet, but feel free to explore." }),
    ]
  }
}
