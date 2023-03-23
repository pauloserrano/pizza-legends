import { GameEntity } from "./GameEntity"

interface SpriteConstructor {
  gameEntity: GameEntity
  src: string
}

export class Sprite {
  private gameEntity: GameEntity
  private image: HTMLImageElement
  private shadow: HTMLImageElement
  private isImageLoaded: boolean = false
  private isShadowLoaded: boolean = false
  
  constructor({ gameEntity, src }: SpriteConstructor) {
    this.gameEntity = gameEntity

    this.image = new Image()
    this.image.src = src
    this.image.onload = () => this.isImageLoaded = true
    
    this.shadow = new Image()
    this.shadow.src = "assets/characters/shadow.png"
    this.shadow.onload = () => this.isShadowLoaded = true
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const NUDGE = { x: 8, y: 18 }
    const IMG_SIZE = { x: 32, y: 32 }
    const IMG_CUT = { 
      xStart: 0 * 32, 
      yStart: 0 * 32, 
      xEnd: IMG_SIZE.x, 
      yEnd: IMG_SIZE.y
    }

    const position = {
      x: this.gameEntity.getPosition().x - NUDGE.x,
      y: this.gameEntity.getPosition().y - NUDGE.y
    }

    if (this.isShadowLoaded) {
      ctx.drawImage(this.shadow, position.x, position.y)
    }

    if (this.isImageLoaded) {
      ctx.drawImage(
        this.image, 
        IMG_CUT.xStart,
        IMG_CUT.yStart,
        IMG_CUT.xEnd,
        IMG_CUT.yEnd,
        position.x,
        position.y,
        IMG_SIZE.x,
        IMG_SIZE.y
      )
    }
  }
}