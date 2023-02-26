import GameEntity from "./GameEntity.js";

export default class Overworld {
 constructor({ element }) {
   this.element = element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
 }

 init() {
    const image = new Image();
    image.src = "images/maps/DemoLower.png";
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0)
    };

    const hero = new GameEntity({ 
      position: { x: 4, y: 6 }, 
      src: "images/characters/people/hero.png"
    })

    const npc = new GameEntity({
      position: { x: 1, y: 8 },
      src: "images/characters/people/npc1.png"
    })

    setTimeout(() => {
      hero.sprite.draw(this.ctx)
      npc.sprite.draw(this.ctx)
    }, 200)
 }
}