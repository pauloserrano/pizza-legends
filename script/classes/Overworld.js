import maps from "../data/maps.js"
import KeyBindings from "./KeyBindings.js"
import Map from "./Map.js"

export default class Overworld {
 constructor({ element }) {
   this.element = element
   this.canvas = this.element.querySelector(".game-canvas")
   this.ctx = this.canvas.getContext("2d")
   this.map = new Map(maps.DemoRoom)
   this.controls = new KeyBindings()
 }

 startGameLoop() {
  const step = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.map.drawBottomLayer(this.ctx)
    
    Object.values(this.map.gameEntities).forEach(gameEntity => {
      gameEntity.sprite.draw(this.ctx)
      gameEntity.update({
        currentInput: this.controls.currentInput
      })
    })

    this.map.drawTopLayer(this.ctx)

    requestAnimationFrame(step)
  }

  this.controls.init()
  step()
 }

 init() {  
  this.startGameLoop()
 }
}