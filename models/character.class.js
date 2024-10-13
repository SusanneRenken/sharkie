class Character extends MovableObject {
  width = 815 * mainScale;
  height = 1000 * mainScale;
  x = 0;
  y = mainHeight - this.height;  
  IMAGES_IDLE;

  constructor(){
    super();

    this.IMAGES_IDLE = this.generateImagePaths(
      "./img/character",
      "idle",
      this.selectedColor,
      18
    );
    this.loadImage('./img/character/idle/1.png');
    this.loadImages(this.IMAGES_IDLE);

    this.movementSpeed = 200;
    this.animate();
  }

  animate() {
    this.animateMoving(this.IMAGES_IDLE, this.movementSpeed);

    
  }

  
}
