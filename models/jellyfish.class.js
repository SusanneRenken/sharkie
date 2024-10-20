class Jellyfish extends MovableObject {
  COLOR = ["green", "lila", "pink", "yellow"];
  IMAGES_SWIM;
  backgroundRepeat;

  constructor(backgroundRepeat) {
    super();
    this.backgroundRepeat = backgroundRepeat;

    this.getRandomColor();
    this.IMAGES_SWIM = this.generateImagePaths(
      "./img/enemy/jellyfish",
      "swim",
      this.selectedColor,
      4
    );
    this.loadImages(this.IMAGES_SWIM);

    this.width = 211 * mainScale;
    this.height = 300 * mainScale;

    this.x =
      mainWidth + Math.random() * (2 * mainWidth * (this.backgroundRepeat - 1));
    this.y = Math.random() * (mainHeight - this.height);

    this.speed = 0.1 + Math.random() * 0.3;
    this.movementSpeed = 180 + this.speed * 30;
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

    this.moveLeft(this.speed);
  }
}
