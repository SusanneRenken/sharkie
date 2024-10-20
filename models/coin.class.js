class Coin extends MovableObject {
    width = 99 * mainScale;
    height = 93 * mainScale;
    selectedColor = "";
    IMAGES_COIN;
  
    constructor(x, y) {
        super();
    
        this.IMAGES_COIN = this.generateImagePaths(
          "./img/collectibles",
          "coins",
          this.selectedColor,
          4
        );
        this.loadImages(this.IMAGES_COIN);
    
        this.x = x;
        this.y = y;
    
        this.animate();
    }

    animate() {
        setInterval(() => {
          this.animateMoving(this.IMAGES_COIN);
        }, 220);    
      }
}