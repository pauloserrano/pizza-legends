import { emitEvent, CUSTOM_EVENTS } from "../utils.js"

export default class KeyBindings {
  constructor() {
    this.onGoingAction = false
    this.heldKeys = []
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
      "Space": "confirm",
      "Enter": "confirm"
    }
  }

  get currentInput() {
    return this.heldKeys[this.heldKeys.length - 1]
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
        emitEvent(CUSTOM_EVENTS.PLAYER_CONFIRM)
        this.onGoingAction = true
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
        this.onGoingAction = false
      }
    })
  }
}