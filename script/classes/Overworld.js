import maps from "../data/maps.js"
import KeyBindings from "./KeyBindings.js"
import Map from "./Map.js"

export default class Overworld {
 constructor() {
   this.canvas = document.querySelector("canvas")
   this.ctx = this.canvas.getContext("2d")
   this.map = new Map(maps.DemoRoom)
   this.controls = new KeyBindings()
   this.cameraFocus = this.map.gameEntities.find(entity => entity.isBeingControlled)
 }

 startGameLoop() {
  const step = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.map.gameEntities.forEach(gameEntity => {
      gameEntity.update({ 
        currentInput: this.controls.currentInput,
        map: this.map
      })
    })

    this.map.drawBottomLayer(this.ctx, this.cameraFocus)
    
    this.map.gameEntities
      .sort((a, b) => a.position.y - b.position.y)
      .forEach(gameEntity => {
      gameEntity.sprite.draw(this.ctx, this.cameraFocus)
    })

    this.map.drawTopLayer(this.ctx, this.cameraFocus)
    
    requestAnimationFrame(step)
  }

  this.controls.init()
  this.map.mountObjects()
  step()
 }

 init() {  
  this.startGameLoop()
 }
}