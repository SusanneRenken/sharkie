class Pufferfish extends MovableObject {
  x = Math.random() * 620;
  y = Math.random() * 380;
  width = 100;
  height = 100;

  constructor() {
    super().loadImage("./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png");
  }
}
