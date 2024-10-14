class Pufferfish extends MovableObject {
  width = 241 * mainScale;
  height = 198 * mainScale;
  COLOR = ["green", "orange", "red"];
  selectedColor;
  IMAGES_SWIM;

  constructor() {
    super();

    this.getRandomColor();
    this.IMAGES_SWIM = this.generateImagePaths(
      "./img/enemy/pufferfish",
      "swim",
      this.selectedColor,
      5
    );
    this.loadImage(`./img/enemy/pufferfish/swim/${this.selectedColor}1.png`);
    this.loadImages(this.IMAGES_SWIM);

    this.x =
      mainWidth * 0.42 +
      Math.random() * (mainWidth - this.width - mainWidth * 0.42);
    this.y = Math.random() * (mainHeight - this.height);

    this.speed = 0.30 + Math.random() * 0.60;
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

    this.moveLeft(this.speed);
  }
}
