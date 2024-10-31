class EndBossLife extends DrawableObject {
    width = 50 * mainScale;
    height = 50 * mainScale;
    endBoss;
  
    constructor(endBoss) {
      super();
      this.endBoss = endBoss;
      this.x = endBoss.x;
      this.y = endBoss.y - 60;
      this.loadImage("./img/collectibles/heart.png");
    }
  
    updatePosition() {
      this.x = this.endBoss.x;
      this.y = this.endBoss.y - 60;
    }
  }