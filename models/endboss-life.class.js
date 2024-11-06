class EndBossLife extends DrawableObject {
  width = 120;
  height = 120;
  lifeNumber;
  endBoss;

  constructor(endBoss, lifeNumber, imagePath) {
    super();
    this.lifeNumber = lifeNumber;
    this.endBoss = endBoss;
    this.x = endBoss.x + 120 + (lifeNumber % 5) * 110;
    this.y = endBoss.y - 60 - Math.floor(lifeNumber / 5) * 90;
    this.loadImage(imagePath);
  }

  updatePosition() {
    this.x = this.endBoss.x + 180 + (this.lifeNumber % 5) * 110;
    this.y = this.endBoss.y + 450 - Math.floor(this.lifeNumber / 5) * 90;
  }
}
