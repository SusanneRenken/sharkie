class Poison extends MovableObject {
  width = 179;
  height = 244;
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

    this.offsetX = 30;
    this.offsetY = 50;
    this.offsetwidth = this.width - 60;
    this.offsetheight = this.height - 70;

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

      if (this.distanceToPoison < 1920) {
        this.isFalling = true;
      }

      if (this.isFalling && this.y < 830) {
        this.animateMoving(this.IMAGES_POISON);
      } else if (this.y >= 830 && !this.isStopped) {
        this.isStopped = true;
        this.stopAllIntervals();
        this.loadImage(`./img/collectibles/poison/${this.direction}.png`);
        setTimeout(() => {
          this.stopAllIntervals();
        }, 1000);
      }
    }, 100);
  }

  setMovmentInterval() {
    this.movementIntervalId = setInterval(() => {
      if (this.isFalling && this.y < 830) {
        this.y += 3.5;
      }
    }, 1000 / 60);
  }
}
