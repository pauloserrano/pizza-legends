import { CUSTOM_EVENTS } from "../utils.js"
import DialogueText from "./DialogueText.js"

export default class GameEvent {
  constructor({ actor, behavior, map }){
    this.behavior = behavior
    this.actor = actor
    this.map = map
  }

  stand(resolve) {
    this.actor.startBehavior({ 
      behavior: this.behavior, 
      map: this.map 
    })

    const eventHandler = ({ detail }) => {
      if (detail.actor === this.actor){
        document.removeEventListener(CUSTOM_EVENTS.FINISHED_STANDING, eventHandler)
        resolve()
      }
    }

    document.addEventListener(CUSTOM_EVENTS.FINISHED_STANDING, eventHandler)
  }

  walk(resolve) {
    this.actor.startBehavior({ 
      behavior: { ...this.behavior, retry: true }, 
      map: this.map,
    })

    const eventHandler = ({ detail }) => {
      if (detail.actor === this.actor){
        document.removeEventListener(CUSTOM_EVENTS.FINISHED_MOVING, eventHandler)
        resolve()
      }
    }

    document.addEventListener(CUSTOM_EVENTS.FINISHED_MOVING, eventHandler)
  }

  dialogue(resolve) {
    const message = new DialogueText({
      text: this.behavior.text,
      resolve
    })
    message.init({ container: document.querySelector(".game-container") })
  }

  run() {
    return new Promise(resolve => {
      this[this.behavior.type](resolve)
    })
  }
}