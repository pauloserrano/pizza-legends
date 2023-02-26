import Sprite from "./Sprite.js"

export default class GameEntity {
  constructor({ position, src }) {
    this.position = position || { x: 0, y: 0 }
    this.sprite = new Sprite({ gameEntity: this, src })
  }
}