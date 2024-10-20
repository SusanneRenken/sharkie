class Pufferfish extends MovableObject {
  COLOR = ["green", "orange", "red"];
  IMAGES_SWIM;
  backgroundRepeat;

  constructor(backgroundRepeat) {
    super();
    this.backgroundRepeat = backgroundRepeat;

    this.getRandomColor();
    this.IMAGES_SWIM = this.generateImagePaths(
      "./img/enemy/pufferfish",
      "swim",
      this.selectedColor,
      5
    );
    this.loadImages(this.IMAGES_SWIM);

    this.width = 241 * mainScale;
    this.height = 198 * mainScale;

    this.x =
      mainWidth + Math.random() * (2 * mainWidth * (this.backgroundRepeat - 1));
    this.y = Math.random() * (mainHeight - this.height);

    this.speed = 0.3 + Math.random() * 0.6;
    this.movementSpeed = 100 + this.speed * 30;
    this.animate();
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.COLOR.length);
    this.selectedColor = this.COLOR[randomIndex];
  }

  animate() {
    setInterval(() => {
      this.animateMoving(this.IMAGES_SWIM);
    }, this.movementSpeed);

    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }
}
