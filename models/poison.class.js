class Poison extends MovableObject {
  width = 179 * mainScale;
  height = 244 * mainScale;
  direction;

  constructor(x) {
    super();

    this.direction = Math.random() < 0.5 ? 1 : 2;
    this.y = 840 * mainScale;
    this.x = x;

    this.loadImage(`./img/collectibles/poison/${this.direction}.png`);
  }
}
