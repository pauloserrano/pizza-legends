import { convertGridToPixels } from "../utils.js"
import GameEvent from "./GameEvent.js"
import Sprite from "./Sprite.js"

export default class GameEntity {
  constructor({ name, position, src, direction, behaviorLoop }) {
    this.name = name || null
    this.position = {
      x: convertGridToPixels(position?.x || 0),
      y: convertGridToPixels(position?.y || 0)
    }
    this.direction = direction || "down"
    this.sprite = new Sprite({ gameEntity: this, src })
    this.isMounted = false
    
    this.behaviorLoop = behaviorLoop || null
    this.currentBehaviorIndex = 0
  }

  mount({ map }) {
    this.isMounted = true
    map.addWall({ position: this.position })

    if (this.behaviorLoop === null || map.isCutscenePlaying){
      return
    }
    
    setTimeout(() => {
      this.startBehaviorEvent({ map })
    }, 100)
  }
  
  get currentBehavior() {
    if (this.behaviorLoop){
      return this.behaviorLoop[this.currentBehaviorIndex]
    }
  }

  async startBehaviorEvent({ map }) {
    const eventHandler = new GameEvent({ 
      behavior: this.currentBehavior, 
      actor: this, 
      map 
    })

    await eventHandler.run()

    this.currentBehaviorIndex++
    if (this.currentBehavior === undefined){
      this.currentBehaviorIndex = 0
    }

    this.startBehaviorEvent({ map })
  }

  update() {
    return
  }
}