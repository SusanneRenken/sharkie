class BarrierHitbox extends MovableObject {
    constructor(barrierX, barrierY, offsetX, offsetY, offsetwidth, offsetheight) {
      super();
  
      this.x = barrierX;
      this.y = barrierY;

      this.offsetX = offsetX;
      this.offsetY = offsetY;
  
      this.offsetwidth = offsetwidth;
      this.offsetheight = offsetheight;
    }
  }