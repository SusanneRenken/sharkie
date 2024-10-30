class Coin extends MovableObject {
  width = 99 * mainScale;
  height = 93 * mainScale;
  selectedColor = "";
  IMAGES_COIN;
  world;

  constructor(x, y, world) {
    super();
    this.world = world;

    this.IMAGES_COIN = this.loadAllImages("./img/collectibles", "coins", 4);

    this.x = x;
    this.y = y;
    this.offsetwidth = this.width;
    this.offsetheight = this.height;

    this.animate();
  }

  animate() {
    this.animationIntervalId = setInterval(() => {
      this.animateMoving(this.IMAGES_COIN);      
    }, 220);
  }

}