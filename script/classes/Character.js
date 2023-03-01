import GameEntity from "./GameEntity.js";
import { capitalize, directionMapping, emitEvent } from "../utils.js";

export default class Character extends GameEntity {
  constructor({ isBeingControlled, ...superConfig }){
    super(superConfig)
    
    this.movementLimit = 16
    this.movementProgress = this.movementLimit

    this.isBeingControlled = isBeingControlled || false
  }

  startBehavior({ behavior, map }) {
    this.direction = behavior.direction

    switch(behavior.type){
      case "walk":
        if (behavior.type === "walk"){
          const isMovementValid = map.isMovementValid({ position: this.position, direction: this.direction })
    
          if (isMovementValid) {
            map.moveWall({ position: this.position, direction: this.direction })
            this.movementProgress = 0
          }
        }
        return
      case "stand":
        setTimeout(() => {
          emitEvent("hasFinishedStanding", { actor: this })
        }, behavior.time || 1000)
    }
  }

  update({ currentInput, map }) {
    const validInput = currentInput !== undefined
    const isCharacterMoving = this.movementProgress < this.movementLimit

    if (isCharacterMoving) {
      this.updatePosition()
    
    } else if (validInput && this.isBeingControlled){
      this.startBehavior({
        behavior: "walk",
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

    const hasFinishedMoving = this.movementProgress === this.movementLimit
    if (hasFinishedMoving){
      emitEvent("hasFinishedMoving", { actor: this })
    }
  }
}