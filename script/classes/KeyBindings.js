export default class KeyBindings {
  constructor() {
    this.heldKeys = []
    this.keyMapping = {
      "KeyW": "up",
      "KeyD": "right",
      "KeyS": "down",
      "KeyA": "left",
      "ArrowUp": "up",
      "ArrowRight": "right",
      "ArrowDown": "down",
      "ArrowLeft": "left",
    }
  }

  get currentInput() {
    return this.heldKeys[this.heldKeys.length - 1]
  }

  init() {
    document.addEventListener("keydown", (e) => {
      const direction = this.keyMapping[e.code]
      
      if (direction && !this.heldKeys.includes(direction)){
        this.heldKeys.push(direction)
      }
    })

    document.addEventListener("keyup", (e) => {
      const direction = this.keyMapping[e.code]
      const directionIndex = this.heldKeys.indexOf(direction)
      
      if (directionIndex !== -1){
        this.heldKeys.splice(directionIndex, 1)
      }
    })
  }
}