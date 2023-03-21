import { emitEvent, CUSTOM_EVENTS } from "../utils.js"

export default class KeyBindings {
  constructor() {
    this.heldKeys = []
    this.onGoingAction = undefined
    this.directionalMapping = {
      "KeyW": "up",
      "KeyD": "right",
      "KeyS": "down",
      "KeyA": "left",
      "ArrowUp": "up",
      "ArrowRight": "right",
      "ArrowDown": "down",
      "ArrowLeft": "left",
    }
    this.actionMapping = {
      "Space": "interact",
      "Enter": "interact",
      "KeyE": "interact"
    }
  }

  get currentInput() {
    return {
      direction: this.heldKeys[this.heldKeys.length - 1],
      action: this.onGoingAction
    }
  }

  init() {
    document.addEventListener("keydown", (e) => {
      const direction = this.directionalMapping[e.code]
      
      if (direction && !this.heldKeys.includes(direction)) {
        this.heldKeys.push(direction)
        return
      }

      const action = this.actionMapping[e.code]
      if (action && !this.onGoingAction) {
        emitEvent(CUSTOM_EVENTS.PLAYER_INTERACT)
        this.onGoingAction = action
      }
    })

    document.addEventListener("keyup", (e) => {
      const direction = this.directionalMapping[e.code]
      const directionIndex = this.heldKeys.indexOf(direction)
      
      if (directionIndex !== -1) {
        this.heldKeys.splice(directionIndex, 1)
        return
      }

      const action = this.actionMapping[e.code]
      if (action) {
        this.onGoingAction = undefined
      }
    })
  }
}