import { formatToCoordinates, convertGridToPixels, screenCenter, getNextPosition } from "../utils.js"

export default class Map {
  constructor({ gameEntities, src, walls }) {
    this.gameEntities = gameEntities
    
    this.bottomLayer = new Image()
    this.bottomLayer.src = src.bottom

    this.topLayer = new Image()
    this.topLayer.src = src.top

    this.walls = {}

    walls.forEach(([x, y])=> {
      const wallPosition = formatToCoordinates(convertGridToPixels(x), convertGridToPixels(y))
      return this.walls[wallPosition] = true
    })
  }

  mountObjects() {
    this.gameEntities.forEach(entity => entity.mount({ map: this }))
  }

  addWall({ position }) {
    const wallPosition = formatToCoordinates(position.x, position.y)
    this.walls[wallPosition] = true
  }
  
  removeWall({ position }) {
    const wallPosition = formatToCoordinates(position.x, position.y)
    delete this.walls[wallPosition]
  }

  moveWall({ position, direction }) {
    this.removeWall({ position })
    this.addWall({ position: getNextPosition(position, direction) })
  }

  isMovementValid({ position, direction }) {
    const nextPosition = getNextPosition(position, direction)

    return (this.walls[formatToCoordinates(nextPosition.x, nextPosition.y)] === undefined)
  }

  drawBottomLayer(ctx, cameraFocus) {
    const position = {
      x: screenCenter.x - cameraFocus.position.x,
      y: screenCenter.y - cameraFocus.position.y,
    }

    ctx.drawImage(
      this.bottomLayer,
      position.x,
      position.y
    )
  }
  
  drawTopLayer(ctx, cameraFocus) {
    const position = {
      x: screenCenter.x - cameraFocus.position.x,
      y: screenCenter.y - cameraFocus.position.y,
    }

    ctx.drawImage(
      this.topLayer, 
      position.x,
      position.y
    )   
  }
}