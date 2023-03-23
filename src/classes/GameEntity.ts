import { convertGridToPixels } from "../utils"
import { Sprite } from "./Sprite"

interface GameEntityConstructor {
  src: string
  direction?: string
  position: { 
    x: number, 
    y: number 
  }
}

export class GameEntity {
  private position: { x: number, y: number }
  private direction: string
  private sprite: Sprite


  constructor({ position, src, direction }: GameEntityConstructor) {
    this.position = {
      x: convertGridToPixels(position?.x || 0),
      y: convertGridToPixels(position?.y || 0)
    }

    this.direction = direction || "down"
    this.sprite = new Sprite({ 
      gameEntity: this, 
      src 
    })
  }

  public getPosition(): { x: number, y: number } {
    return this.position
  }

  public getDirection(): string {
    return this.direction
  }

  public getSprite(): Sprite {
    return this.sprite
  }
}