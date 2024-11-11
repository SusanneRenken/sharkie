class Barrier extends MovableObject {
  barrierNumber;
  world;

  constructor(barrierNumber, width, height, x, world) {
    super();
    this.world = world;

    this.barrierNumber = barrierNumber;
    this.width = width;
    this.height = height;
    this.y = 1080 - height;
    this.x = x;
    this.offsetwidth = this.width;
    this.offsetheight = this.height;

    this.loadImage(`./img/background/barrier/${barrierNumber}.png`);
    this.getBarrierHitboxen();
  }

  /**
   * Generates hitboxes for the barrier based on its size and adds them to the world.
   */
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
