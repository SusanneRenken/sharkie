class Barrier extends MovableObject {
  barrierNumber
  
  constructor(barrierNumber, width, height, x) {
    super();

    this.barrierNumber = barrierNumber;
    this.width = width;
    this.height = height;
    this.y = mainHeight - height;
    this.x = x;

    this.loadImage(`./img/background/barrier/${barrierNumber}.png`);
  }
}
