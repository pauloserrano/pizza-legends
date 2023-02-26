const defaultAnimations = {
  idleDown: [ [0, 0] ]
}

const imgCut = { xStart: 0, xEnd: 32, yStart: 0, yEnd: 32 }
const imgSize = { x: 32, y: 32 }
const FRAME_PIXEL = { x: 16, y: 16 }
const NUDGE = { x: 8, y: 18 }

export default class Sprite {
  constructor({ gameEntity, src, animations, currentAnimation, currentAnimationFrame }) {
    this.gameEntity = gameEntity

    this.image = new Image()
    this.image.src = src
    this.image.onload = () => this.isImageLoaded = true
    
    this.shadow = new Image()
    this.shadow.src = "images/characters/shadow.png"
    this.shadow.onload = () => this.isShadowLoaded = true
    
    this.animations = animations || defaultAnimations
    this.currentAnimation = currentAnimation || "idleDown"
    this.currentAnimationFrame = currentAnimationFrame || 0
  }

  draw(ctx) {
    const position = {
      x: this.gameEntity.position.x - NUDGE.x,
      y: this.gameEntity.position.y - NUDGE.y
    }

    if (this.isShadowLoaded) {
      ctx.drawImage(this.shadow, position.x, position.y)
    }

    if (this.isImageLoaded) {
      ctx.drawImage(
        this.image, 
        imgCut.xStart,
        imgCut.yStart,
        imgCut.xEnd,
        imgCut.yEnd,
        position.x,
        position.y,
        imgSize.x,
        imgSize.y
      )
    }
  }
}
