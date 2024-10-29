class Coin extends MovableObject {
  width = 99 * mainScale;
  height = 93 * mainScale;
  selectedColor = "";
  IMAGES_COIN;

  constructor(x, y) {
    super();

    this.IMAGES_COIN = this.loadAllImages("./img/collectibles", "coins", 4);

    this.x = x;
    this.y = y;
    this.offsetwidth = this.width;
    this.offsetheight = this.height;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.animateMoving(this.IMAGES_COIN);
    }, 220);
  }
}
