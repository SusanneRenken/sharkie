class Jellyfish extends MovableObject {
  
  COLOR = ["green", "lila", "pink", "yellow"];
  selectedColor;
  IMAGES_SWIM;

  constructor() {
    super();

    this.getRandomColor();
    this.IMAGES_SWIM = this.generateImagePaths(
      "./img/enemy/jellyfish",
      "swim",
      this.selectedColor,
      4
    );
    this.loadImage(`./img/enemy/jellyfish/swim/${this.selectedColor}1.png`);
    this.loadImages(this.IMAGES_SWIM);

    this.width = 100;
    this.height = 150;

    this.x =
      mainWidth * 0.42 +
      Math.random() *
        (2 * backgroundRepeat * mainWidth - this.width - mainWidth * 0.42);

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
