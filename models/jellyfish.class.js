class Jellyfish extends MovableObject {
  x = Math.random() * 620;
  y = Math.random() * 380;
  width = 100;
  height = 100;

  constructor() {
    super().loadImage("./img/2.Enemy/2 Jelly fish/Super dangerous/Green 4.png");
  }
}
