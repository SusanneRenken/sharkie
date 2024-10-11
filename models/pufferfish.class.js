class Pufferfish extends MovableObject {
  width = 241 * mainScale;
  height = 198 * mainScale;
  x = Math.random() * (mainWidth - this.width);
  y = Math.random() * (mainHeight - this.height);
  

  constructor() {
    super().loadImage("./img/2.Enemy/1.Puffer fish/1.Swim/3.swim5.png");
  }
}
