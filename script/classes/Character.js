import GameEntity from "./GameEntity.js";
import { capitalize } from "../utils.js";

export default class Character extends GameEntity {
  constructor({ position, src, isBeingControlled }){
    super({ position, src })
    
    this.movementLimit = 16
    this.movementProgress = this.movementLimit
    this.isBeingControlled = isBeingControlled || false

    this.directionMapping = {
      up: ["y", -1],
      right: ["x", 1],
      down: ["y", 1],
      left: ["x", -1]
    }
  }

  update({ currentInput }) {
    const validInput = currentInput !== undefined
    const isCharacterMoving = this.movementProgress < this.movementLimit
    
    this.updatePosition()
    this.updateSprite({ currentInput })
    
    if (validInput && !isCharacterMoving && this.isBeingControlled){
      this.direction = currentInput
      this.movementProgress = 0
    }
  }

  updateSprite({ currentInput }) {
    const validInput = currentInput !== undefined
    const isCharacterMoving = this.movementProgress < this.movementLimit
    
    if (!validInput && !isCharacterMoving && this.isBeingControlled){
      this.sprite.setCurrentAnimation(`idle${capitalize(this.direction)}`)
    
    } else if (isCharacterMoving && this.isBeingControlled) {
      this.sprite.setCurrentAnimation(`walk${capitalize(this.direction)}`)
    }
  }

  updatePosition() {
    const isCharacterMoving = this.movementProgress < this.movementLimit
        
    if (isCharacterMoving) {
      const [axis, movement] = this.directionMapping[this.direction]
      
      this.position[axis] += movement
      this.movementProgress++
    }
  }
}