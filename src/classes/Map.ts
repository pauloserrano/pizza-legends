import { GameEntity } from "./GameEntity"

interface MapConstructor {
  src: {
    lower: string,
    upper: string
  },
  gameEntities?: GameEntity[]
}

export class Map {
  private lowerLayer: HTMLImageElement
  private upperLayer: HTMLImageElement
  private gameEntities: GameEntity[]

  constructor({ src, gameEntities }: MapConstructor) {
    this.gameEntities = gameEntities || []

    this.lowerLayer = new Image()
    this.lowerLayer.src = src.lower
    
    this.upperLayer = new Image()
    this.upperLayer.src = src.upper
  }

  public drawLowerLayer(ctx: CanvasRenderingContext2D) {
    const position = { x: 0, y: 0 }
    
    ctx.drawImage(
      this.lowerLayer,
      position.x,
      position.y
    )
  }
  
  public drawUpperLayer(ctx: CanvasRenderingContext2D) {
    const position = { x: 0, y: 0 }
    
    ctx.drawImage(
      this.upperLayer,
      position.x,
      position.y
    )
  }

  public getGameEntities(): GameEntity[] {
    return this.gameEntities
  }
}