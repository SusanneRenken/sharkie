class Poison extends MovableObject {
  width = 179 * mainScale;
  height = 244 * mainScale;
  direction;
  IMAGES_POISON;
  isFalling = false;
  isStopped = false;
  distanceToPoison;
  world;

  constructor(x, world) {
    super();
    this.world = world;
    this.direction = Math.random() < 0.5 ? 1 : 2;
    this.y = 0;
    this.x = x;

    this.offsetX = 30 * mainScale;
    this.offsetY = 50 * mainScale;
    this.offsetwidth = this.width - 60 * mainScale;
    this.offsetheight = this.height - 70 * mainScale;

    this.IMAGES_POISON = this.loadAllImages(
      "./img/collectibles/poison",
      "animation",
      8
    );
    this.animate();
  }

  animate() {
    this.setAnimationInterval();
    this.setMovmentInterval();
  }

  setAnimationInterval() {
    this.animationIntervalId = setInterval(() => {
      this.distanceToPoison = this.x - this.world.character.x;

      if (this.distanceToPoison < mainWidth) {
        this.isFalling = true;
      }

      if (this.isFalling && this.y < 830 * mainScale) {
        this.animateMoving(this.IMAGES_POISON);
      } else if (this.y >= 830 * mainScale && !this.isStopped) {
        this.isStopped = true;
        this.loadImage(`./img/collectibles/poison/${this.direction}.png`);
      }
    }, 100);
  }

  setMovmentInterval() {
    this.movementIntervalId = setInterval(() => {
      if (this.isFalling && this.y < 830 * mainScale) {
        this.y += 1;
      }
    }, 1000 / 60);
  }
}
