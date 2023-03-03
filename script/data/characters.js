import Character from "../classes/Character.js";
import Behavior from "../models/Behavior.js";

export const characters = {
  hero: new Character({ 
    name: "Hero",
    src: "images/characters/people/hero.png",
    position: { x: 5, y: 6 }, 
    isBeingControlled: true
  }),

  npc1: new Character({
    name: "NPC1",
    src: "images/characters/people/npc1.png",
    position: { x: 1, y: 8 },
    behaviorLoop: [
      new Behavior({ type: "stand", direction: "down", time: 5000 }),
      new Behavior({ type: "stand", direction: "left", time: 3000 }),
      new Behavior({ type: "stand", direction: "right", time: 2000 }),
      new Behavior({ type: "stand", direction: "down", time: 3000 }),
    ]
  }),

  npc2: new Character({
    name: "NPC2",
    src: "images/characters/people/npc2.png",
    position: { x: 9, y: 6 },
    direction: "left",
    behaviorLoop: [
      new Behavior({ type: "walk", direction: "right" }),
      new Behavior({ type: "stand", direction: "right", time: 4000 }),
      new Behavior({ type: "walk", direction: "down" }),
      new Behavior({ type: "walk", direction: "down" }),
      new Behavior({ type: "stand", direction: "down", time: 5000 }),
      new Behavior({ type: "walk", direction: "left" }),
      new Behavior({ type: "stand", direction: "left", time: 30000 }),
      new Behavior({ type: "walk", direction: "up" }),
      new Behavior({ type: "walk", direction: "up" }),
      new Behavior({ type: "stand", direction: "up", time: 4000 }),
    ]
  })
}
