class EndBossLife extends DrawableObject {
    width = 157;
    height = 157;
    lifeNumber;
    endBoss;
  
    constructor(endBoss, lifeNumber, imagePath) {
      super();
      this.lifeNumber = lifeNumber;
      this.endBoss = endBoss;
      this.x = endBoss.x + this.lifeNumber * 100 ;
      this.y = endBoss.y - 60;
      this.loadImage(imagePath);
    }
  
    updatePosition() {
      this.x = this.endBoss.x + 50 + this.lifeNumber * 120;
      this.y = this.endBoss.y + 320;
    }
  }