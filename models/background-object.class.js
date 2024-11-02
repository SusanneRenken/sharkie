class BackgroundObject extends MovableObject {
  width = mainWidth * 2;
  height = mainHeight;

  constructor(imbagePath, position) {
    super();
    this.x = position * (this.width - 1);
    this.loadImage(imbagePath);
  }
}
