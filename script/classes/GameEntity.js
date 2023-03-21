import { convertGridToPixels } from "../utils.js"
import GameEvent from "./GameEvent.js"
import Sprite from "./Sprite.js"

export default class GameEntity {
  constructor({ name, position, src, direction, behaviorLoop, events }) {
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

    this.events = events || null
  }

  mount({ map }) {
    this.isMounted = true
    map.addWall({ position: this.position, entity: this })
    
    setTimeout(() => {
      this.startBehaviorLoop({ map })
    }, 100)
  }
  
  get currentBehavior() {
    if (this.behaviorLoop){
      return this.behaviorLoop[this.currentBehaviorIndex]
    }
  }

  async startBehaviorLoop({ map }) {
    if (!this.behaviorLoop || map.isCutscenePlaying){
      return
    }

    await new GameEvent({
      ...this.currentBehavior,
      actor: this,
      map
    }).run()

    this.currentBehaviorIndex++
    if (this.currentBehavior === undefined){
      this.currentBehaviorIndex = 0
    }

    this.startBehaviorLoop({ map })
  }

  update() {
    return
  }
}