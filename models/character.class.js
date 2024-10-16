class Character extends MovableObject {
  width = 815 * mainScale;
  height = 1000 * mainScale;
  x = 0;
  y = -10;
  selectedColor = "";
  IMAGES_IDLE;
  IMAGES_SWIM;
  world;

  constructor(characterSpeed) {
    super();

    this.IMAGES_IDLE = this.loadAllImages("./img/character", "idle", 18);
    this.IMAGES_SWIM = this.loadAllImages("./img/character", "swim", 6);

    this.speed = characterSpeed;
    this.movementSpeed = 180;
    this.animate();
  }

  loadAllImages(basePath, action, count) {
    const images = this.generateImagePaths(
      basePath,
      action,
      this.selectedColor,
      count
    );
    this.loadImage(`${basePath}/${action}/1.png`);
    this.loadImages(images);
    return images;
  }

  animate() {
    setInterval(() => {
      this.animateMoving(this.IMAGES_IDLE);

      if (this.world.keyboard.ARROWRIGHT || this.world.keyboard.ARROWLEFT) {
        this.animateMoving(this.IMAGES_SWIM);
      }
    }, 180);

    setInterval(() => {
      if (this.world.keyboard.ARROWRIGHT && this.x < this.world.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.ARROWLEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + (62 * mainScale);
    }, 1000 / 60);
  }
}
