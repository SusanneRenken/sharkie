class Sunlight extends MovableObject {
  width = mainWidth * 2;
  height = mainHeight;
  x = 0;
  y = 0;
  selectedColor = "";
  IMAGES_IDLE;
  IMAGES_SWIM;
  world;

  constructor(imbagePath, characterSpeed, backgroundRepeat) {
    super();
    this.loadImage(imbagePath);
    this.speed = characterSpeed * ((backgroundRepeat - 1) / (backgroundRepeat - 0.5));
    this.movementSpeed = 180;
    this.animate();
  }

   

  animate() {
    setInterval(() => {
      if (this.world.keyboard.ARROWRIGHT && this.x < (this.world.levelEndX - mainWidth) && !this.world.isAttack) {
        this.x += this.speed;
      }
      if (this.world.keyboard.ARROWLEFT && this.x > 0 && !this.world.isAttack) {
        this.x -= this.speed;
      }
    }, 1000 / 60);
  }
}
