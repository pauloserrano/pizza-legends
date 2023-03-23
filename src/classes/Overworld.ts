import { GameEntity } from "./GameEntity"
import { Map } from "./Map"

export class Overworld {
  private canvas: HTMLCanvasElement = document.querySelector("canvas")!
  private ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!
  private map: Map

  constructor(){
    this.map = new Map({
      src: {
        lower: "./assets/maps/DemoLower.png",
        upper: "./assets/maps/DemoUpper.png",
      },
      gameEntities: [
        new GameEntity({ 
          src: "assets/characters/people/hero.png",
          position: { x: 5, y: 6 }
        }),
      ]
    })
  }

  startGameLoop(): void {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.map.drawLowerLayer(this.ctx)

      this.map.getGameEntities().forEach(gameEntity => {
        gameEntity.getSprite().draw(this.ctx)
      })

      this.map.drawUpperLayer(this.ctx)

      requestAnimationFrame(step)
    }

    step()
  }

  init(): void {
    this.startGameLoop()
  }
}
