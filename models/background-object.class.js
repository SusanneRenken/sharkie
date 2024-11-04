class BackgroundObject extends MovableObject {
  width = 1920 * 2;
  height = 1080;

  constructor(imbagePath, position) {
    super();
    this.x = position * (this.width - 1);
    this.loadImage(imbagePath);
  }
}
