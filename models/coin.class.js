class Coin extends MovableObject {
    width = 99 * mainScale;
    height = 93 * mainScale;
    selectedColor = "";
    IMAGES_COIN;
  
    constructor(x, y) {
        super();
        // this.backgroundRepeat = backgroundRepeat;
    
        this.IMAGES_COIN = this.generateImagePaths(
          "./img/items",
          "coins",
          this.selectedColor,
          4
        );
        this.loadImage(`./img/items/coins/1.png`);
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