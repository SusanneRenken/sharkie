class EndBossLife extends DrawableObject {
    width = 157 * mainScale;
    height = 157 * mainScale;
    lifeNumber;
    endBoss;
  
    constructor(endBoss, lifeNumber, imagePath) {
      super();
      this.lifeNumber = lifeNumber;
      this.endBoss = endBoss;
      this.x = endBoss.x + this.lifeNumber * 100 * mainScale;
      this.y = endBoss.y - 60;
      this.loadImage(imagePath);
    }
  
    updatePosition() {
      this.x = this.endBoss.x + 50 + this.lifeNumber * 120 * mainScale;
      this.y = this.endBoss.y + 320 * mainScale;
    }

  }