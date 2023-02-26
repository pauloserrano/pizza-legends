import GameEntity from "./GameEntity.js";

export default class Character extends GameEntity {
  constructor({ position, src, isBeingControlled }){
    super({ position, src })
    
    this.remainingMovement = 0
    this.isBeingControlled = isBeingControlled || false

    this.directionMapping = {
      up: ["y", -1],
      right: ["x", 1],
      down: ["y", 1],
      left: ["x", -1]
    }
  }

  update({ currentInput }) {
    this.updatePosition()

    if (currentInput && this.remainingMovement === 0 && this.isBeingControlled){
      this.direction = currentInput
      this.remainingMovement = 16
    }
  }

  updatePosition() {
    const isMoving = this.remainingMovement > 0
    
    if (isMoving) {
      const [axis, movement] = this.directionMapping[this.direction]
      
      this.position[axis] += movement
      this.remainingMovement--
    }
  }
}