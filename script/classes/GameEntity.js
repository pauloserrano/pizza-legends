import { convertGridToPixels } from "../utils.js"
import Sprite from "./Sprite.js"

export default class GameEntity {
  constructor({ position, src, direction }) {
    this.position = {
      x: convertGridToPixels(position?.x || 0),
      y: convertGridToPixels(position?.y || 0)
    }
    this.direction = direction || "down"
    this.sprite = new Sprite({ gameEntity: this, src })
  }

  update() {
    return
  }
}