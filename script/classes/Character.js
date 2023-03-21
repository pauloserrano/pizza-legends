import { capitalize, directionMapping, emitEvent, CUSTOM_EVENTS, getNextPosition } from "../utils.js";
import GameEntity from "./GameEntity.js";

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
        const isMovementValid = (map.checkSpace({ 
          position: getNextPosition(this.position, this.direction)
        }) === undefined)
        
        if (!isMovementValid) {
          behavior.retry && setTimeout(() => {
            this.startBehavior({ behavior, map })
          }, 1000)
          
          return
        }

        this.movementProgress = 0
        map.moveWall({ 
          position: this.position, 
          direction: this.direction,
          entity: this 
        })
        
        break

      case "stand":
        setTimeout(() => {
          emitEvent(CUSTOM_EVENTS.FINISHED_STANDING, { actor: this })
        }, behavior.time || 100)
        break
    }
  }

  update({ currentInput, map }) {
    const isCharacterMoving = this.movementProgress < this.movementLimit
    
    if (isCharacterMoving) {
      this.updatePosition()
    
    } else if (currentInput.direction && this.isBeingControlled && !map.isCutscenePlaying){
      this.startBehavior({
        behavior: { type: "walk", direction: currentInput.direction },
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
      emitEvent(CUSTOM_EVENTS.FINISHED_MOVING, { actor: this })
    }
  }
}