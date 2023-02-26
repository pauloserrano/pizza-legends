export default class Map {
  constructor({ gameEntities, src: { bottom, top } }) {
    this.gameEntities = gameEntities
    
    this.bottomLayer = new Image()
    this.bottomLayer.src = bottom

    this.topLayer = new Image()
    this.topLayer.src = top
  }

  drawBottomLayer(ctx) {
    ctx.drawImage(this.bottomLayer, 0, 0)
  }
  
  drawTopLayer(ctx) {
    ctx.drawImage(this.topLayer, 0, 0)
  }
}