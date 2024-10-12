class Pufferfish extends MovableObject {
  width = 241 * mainScale;
  height = 198 * mainScale;
  COLOR = ["green", "orange", "red"];
  selectedColor;

  constructor() {
    super();
    this.getRandomColor();
    this.loadImage(`./img/enemy/pufferfish/${this.selectedColor}/swim1.png`);

    this.x =
      mainWidth * 0.42 +
      Math.random() * (mainWidth - this.width - mainWidth * 0.42);
    this.y = Math.random() * (mainHeight - this.height);

    this.animate();
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.COLOR.length);
    this.selectedColor = this.COLOR[randomIndex];
  }

  animate() {
    setInterval(() => {
      this.x -= 0.25;
    }, 1000 / 60);
  }
}
