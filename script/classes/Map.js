import { formatToCoordinates, convertGridToPixels, directionMapping, screenCenter } from "../utils.js"

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

  isMovementValid({ position, direction }) {
    const [axis, movement] = directionMapping[direction]
    const nextPosition = { ...position }

    nextPosition[axis] += convertGridToPixels(movement)

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