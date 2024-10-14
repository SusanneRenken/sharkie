class Character extends MovableObject {
  width = 815 * mainScale;
  height = 1000 * mainScale;
  x = 0;
  y = mainHeight - this.height;
  selectedColor = "";
  IMAGES_IDLE;
  IMAGES_SWIM;
  world;

  constructor() {
    super();

    this.IMAGES_IDLE = this.loadAllImages("./img/character", "idle", 18);
    this.IMAGES_SWIM = this.loadAllImages("./img/character", "swim", 6);

    this.speed = 5;
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
      if (this.world.keyboard.ARROWRIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.ARROWLEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x;
    }, 1000 / 60);
  }
}
