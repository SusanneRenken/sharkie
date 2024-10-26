class Jellyfish extends MovableObject {
  COLOR = ["melon", "lila", "pink", "yellow"];
  IMAGES_SWIM;
  backgroundRepeat;
  isMovingDown = true;

  constructor(backgroundRepeat, x) {
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

    this.x = x;
    this.y = 0.1 * mainHeight;

    this.speed = 0.5 + Math.random() * 0.5;
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

    setInterval(() => {
      const upperLimit = 0 * mainHeight;
      const lowerLimit = 0.7 * mainHeight;
      
      if (this.y >= lowerLimit || this.y <= upperLimit) {
        this.isMovingDown = !this.isMovingDown;
      }
    
      this.y += this.isMovingDown ? this.speed : -this.speed;
    }, 1000 / 60);
  }
}
