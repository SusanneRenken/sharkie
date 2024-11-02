class Sunlight extends MovableObject {
  width = mainWidth * 2;
  height = mainHeight;
  x = 0;
  y = 0;
  selectedColor = "";
  IMAGES_IDLE;
  IMAGES_SWIM;
  world;

  constructor(world) {
    super();
    this.world = world;
    this.loadImage("./img/background/layers/light/3.png");

    this.speed = -((this.world.backgroundRepeat - 1) / (this.world.backgroundRepeat - 0.5));

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (
        this.world.keyboard.ARROWRIGHT &&
        this.world.character.x < this.world.levelEndX &&
        !this.world.isAttack
      ) {
        this.moveRight(this.speed);
      }

      if (this.world.keyboard.ARROWLEFT && this.world.character.x > 0 && !this.world.isAttack) {
        this.moveLeft(this.speed);
      }
    }, 1000 / 60);
  }
}
