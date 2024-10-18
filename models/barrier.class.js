class Barrier extends MovableObject {
  

  constructor(barrierNumber, width, height, x) {
    super();

    this.width = width;
    this.height = height;
    this.y = mainHeight - height;
    this.x = x;

    this.loadImage(`./img/background/barrier/${barrierNumber}.png`);
  }
}
