class Heart extends MovableObject {
  width = 101;
  height = 90;
  selectedColor = "";
  world;

  constructor(world, x, y) {
    super();
    this.world = world;

    this.loadImage(`./img/enemy/jellyfish/heart.png`);

    this.x = x;
    this.y = y;
    this.offsetwidth = this.width;
    this.offsetheight = this.height;
  }
}
