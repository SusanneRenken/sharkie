class Finalenemy extends MovableObject {
  introduceComplete = false;
  introduceStartX;
  IMAGES_INTRODUCE;
  IMAGES_FLOATING;
  world;  

  constructor(backgroundRepeat) {
    super();

    this.width = 1041 * mainScale;
    this.height = 1216 * mainScale;
    this.x = 2 * mainWidth * backgroundRepeat - 1.3 * this.width;
    this.y = -mainHeight;
    this.introduceStartX =
      2 * mainWidth * (backgroundRepeat - 0.5) - 1 * this.width;

    this.IMAGES_INTRODUCE = this.loadAllImages(
      "./img/enemy/finalenemy",
      "introduce",
      10
    );
    this.IMAGES_FLOATING = this.loadAllImages(
      "./img/enemy/finalenemy",
      "floating",
      13
    );

    this.speed = 1;

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (
        !this.introduceComplete &&
        this.world.character.x > this.introduceStartX
      ) {
        this.y = -70;
        SOUNG_FINALENEMY_INTRODUCE.play();
        this.animateMovingOnce(this.IMAGES_INTRODUCE);
        if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
          this.introduceComplete = true;
          this.currentImage = 0;
          this.startMoving();
        }
      } else if (this.introduceComplete) {
        this.animateMoving(this.IMAGES_FLOATING);
      }
    }, 250);

    if (this.introduceComplete) {
      setInterval(() => {
        this.moveLeft(this.speed);
      }, 1000 / 60);
    }
  }

  startMoving() {
    this.movementInterval = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }
}
