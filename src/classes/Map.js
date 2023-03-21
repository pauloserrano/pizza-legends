import { formatToCoordinates, convertGridToPixels, screenCenter, getNextPosition } from "../utils.js"
import GameEvent from "./GameEvent.js"

export default class Map {
  constructor({ gameEntities, src, walls }) {
    this.gameEntities = gameEntities
    this.isCutscenePlaying = false
    
    this.bottomLayer = new Image()
    this.bottomLayer.src = src.bottom

    this.topLayer = new Image()
    this.topLayer.src = src.top

    this.walls = {}

    walls?.forEach(([x, y])=> {
      const wallPosition = formatToCoordinates(convertGridToPixels(x), convertGridToPixels(y))
      return this.walls[wallPosition] = true
    })
  }

  async startCutscene({ events }) {
    this.isCutscenePlaying = true

    for (const event of events) {
      console.log(event.behavior)
      await new GameEvent({
        ...event,
        map: this
      }).run()
    }

    this.isCutscenePlaying = false
    this.gameEntities.forEach(entity => entity.startBehaviorLoop({ map: this }))
  }

  mountObjects() {
    this.gameEntities.forEach(entity => entity.mount({ map: this }))
  }

  addWall({ position, entity }) {
    const wallPosition = formatToCoordinates(position.x, position.y)
    this.walls[wallPosition] = entity || true
  }
  
  removeWall({ position }) {
    const wallPosition = formatToCoordinates(position.x, position.y)
    delete this.walls[wallPosition]
  }

  moveWall({ position, direction, entity }) {
    this.removeWall({ position })
    this.addWall({ position: getNextPosition(position, direction), entity })
  }

  checkSpace({ position }) {
    return this.walls[formatToCoordinates(position.x, position.y)]
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