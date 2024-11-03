class Barrier extends MovableObject {
  barrierNumber;
  world;

  constructor(barrierNumber, width, height, x, world) {
    super();
    this.world = world;

    this.barrierNumber = barrierNumber;
    this.width = width;
    this.height = height;
    this.y = mainHeight - height;
    this.x = x;
    this.offsetwidth = this.width;
    this.offsetheight = this.height;

    this.loadImage(`./img/background/barrier/${barrierNumber}.png`);
    this.getBarrierHitboxen();
  }

  getBarrierHitboxen() {
    const barrierHitboxSizes = getBarrierHitboxSizes(this.width, this.height);
    const hitboxes = barrierHitboxSizes[this.barrierNumber - 1];

    hitboxes.forEach((hitboxData) => {
      this.world.barrierHitboxes.push(
        new BarrierHitbox(
          this.x,
          this.y,
          hitboxData.offsetX,
          hitboxData.offsetY,
          hitboxData.offsetWidth,
          hitboxData.offsetHeight
        )
      );
    });
  }
}
