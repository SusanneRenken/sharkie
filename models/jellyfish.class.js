class Jellyfish extends MovableObject {  
  width = 211 * mainScale;
  height = 300 * mainScale;
  x = Math.random() * (mainWidth - this.width);
  y = Math.random() * (mainHeight - this.height);

  constructor() {
    super().loadImage("./img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
  }
}
