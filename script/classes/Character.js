import GameEntity from "./GameEntity.js";
import { capitalize, directionMapping } from "../utils.js";

export default class Character extends GameEntity {
  constructor({ position, src, isBeingControlled }){
    super({ position, src })
    
    this.movementLimit = 16
    this.movementProgress = this.movementLimit

    this.isBeingControlled = isBeingControlled || false
  }

  startBehavior({ type, direction, map }) {
    this.direction = direction

    if (type === "walk"){
      const isMovementValid = map.isMovementValid({ 
        position: this.position, 
        direction: this.direction
      })

      if (!isMovementValid) {
        return
      }

      this.movementProgress = 0
    }
  }

  update({ currentInput, map }) {
    const validInput = currentInput !== undefined
    const isCharacterMoving = this.movementProgress < this.movementLimit

    if (isCharacterMoving) {
      this.updatePosition()
    
    } else if (validInput && this.isBeingControlled){
      this.startBehavior({
        type: "walk",
        direction: currentInput,
        map
      })
    }
    
    this.updateSprite()
  }

  updateSprite() {
    const isCharacterMoving = this.movementProgress < this.movementLimit

    if (isCharacterMoving){
      this.sprite.setCurrentAnimation(`walk${capitalize(this.direction)}`)
      return
    } 
    
    this.sprite.setCurrentAnimation(`idle${capitalize(this.direction)}`)
  }

  updatePosition() {
    const [axis, movement] = directionMapping[this.direction]
    this.position[axis] += movement
    this.movementProgress++
  }
}