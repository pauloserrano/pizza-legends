import { animations as defaultAnimations } from "../data/index.js"
import { screenCenter } from "../utils.js"

export default class Sprite {
  constructor({ gameEntity, src, animations, currentAnimation, currentAnimationFrame, animationFrameLimit }) {
    this.gameEntity = gameEntity

    this.image = new Image()
    this.image.src = src
    this.image.onload = () => this.isImageLoaded = true
    
    this.shadow = new Image()
    this.shadow.src = "images/characters/shadow.png"
    this.shadow.onload = () => this.isShadowLoaded = true
    
    this.animations = animations || defaultAnimations
    this.currentAnimation = currentAnimation || "idleUp"
    this.currentAnimationFrame = currentAnimationFrame || 0

    this.animationFrameLimit = animationFrameLimit || 8
    this.animationFrameProgress = 0
  }

  get currentFrame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setCurrentAnimation(animation) {
    if (animation === this.currentAnimation){
      return
    }

    this.currentAnimation = animation
    this.currentAnimationFrame = 0
    this.animationFrameProgress = 0
  }

  updateAnimation() {
    if (this.animationFrameProgress < this.animationFrameLimit){
      this.animationFrameProgress++
      return
    }
    
    this.animationFrameProgress = 0
    this.currentAnimationFrame++

    if (this.currentFrame === undefined){
      this.currentAnimationFrame = 0
    }
  }

  draw(ctx, cameraFocus) {
    const NUDGE = { x: 8, y: 18 }
    const imgSize = { x: 32, y: 32 }
    const imgCut = { 
      xStart: this.currentFrame.x * 32, 
      yStart: this.currentFrame.y * 32, 
      xEnd: imgSize.x, 
      yEnd: imgSize.y
    }

    const position = {
      x: this.gameEntity.position.x + screenCenter.x - cameraFocus.position.x - NUDGE.x,
      y: this.gameEntity.position.y + screenCenter.y - cameraFocus.position.y - NUDGE.y
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

    this.updateAnimation()
  }
}
