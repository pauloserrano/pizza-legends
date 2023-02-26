export default class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
 }

 init() {
   const image = new Image();
   image.src = "/images/maps/DemoLower.png";
   image.onload = () => {
     this.ctx.drawImage(image, 0, 0)
   };

   const position = { x: 5, y: 6 }
   const imgCut = { xStart: 0, xEnd: 32, yStart: 0, yEnd: 32 }

   const heroShadow = new Image();
   heroShadow.src = "/images/characters/shadow.png";
   heroShadow.onload = () => {
    this.ctx.drawImage(
      heroShadow, 
      imgCut.xStart,
      imgCut.yStart,
      imgCut.xEnd,
      imgCut.yEnd,
      position.x * 16 - 8,
      position.y * 16 - 18,
      32,
      32
    )
   }

   const hero = new Image();
   hero.src = "/images/characters/people/hero.png";
   hero.onload = () => {
     this.ctx.drawImage(
       hero, 
       imgCut.xStart,
       imgCut.yStart,
       imgCut.xEnd,
       imgCut.yEnd,
       position.x * 16 - 8,
       position.y * 16 - 18,
       32,
       32
    )
   }
 }
}