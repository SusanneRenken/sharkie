class Endboss extends MovableObject {
  introduceNotStarted = true;
  introduceComplete = false;
  introduceStartX;
  IMAGES_INT;
  IMAGES_SWIM;
  IMAGES_ATT;
  IMAGES_HURT;
  IMAGES_DEAD;
  world;

  constructor(backgroundRepeat, world) {
    super();
    this.world = world;
    
    this.width = 1041 * mainScale;
    this.height = 1216 * mainScale;
    this.x = 2 * mainWidth * backgroundRepeat - 1.3 * this.width;
    this.y = -mainHeight;
    this.introduceStartX =
      2 * mainWidth * (backgroundRepeat - 0.5) - 1 * this.width;

    this.IMAGES_INT = this.loadAllImages("./img/enemy/endboss", "int", 10);
    this.IMAGES_SWIM = this.loadAllImages("./img/enemy/endboss", "swim", 13);
    this.IMAGES_ATT = this.loadAllImages("./img/enemy/endboss", "attack", 6);
    this.IMAGES_HURT = this.loadAllImages("./img/enemy/endboss", "hurt", 4);
    this.IMAGES_DEAD = this.loadAllImages("./img/enemy/endboss", "dead", 6);

    this.speed = 1;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (
        !this.introduceComplete &&
        this.introduceNotStarted &&
        this.world.character.x > this.introduceStartX
      ) {
        this.y = -70;
        SOUND_ENDBOSS_INTRODUCE.play();
        if (this.introduceNotStarted) {
          this.animateMovingOnce(this.IMAGES_INT);
          this.isAnimationComplete(this.IMAGES_INT, "introduceNotStarted");
        }
        if (!this.introduceNotStarted) {
          this.introduceComplete = true;
          this.startMoving();
        }
      } else if (this.introduceComplete) {
        this.animateSwimAndAttack();
      }
    }, 250);
  }

  startMoving() {
    this.movementInterval = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  animateSwimAndAttack() {
    if (this.animationCount < 1) {
      this.speed = 1;
      this.animateMoving(this.IMAGES_SWIM);
      this.isAnimateSwim(this.IMAGES_SWIM);
    } else if (this.animationCount === 1) {
      this.speed = 2;
      SOUND_ENDBOSS_ATTACK.play();
      this.animateMoving(this.IMAGES_ATT);
      this.isAnimateAttack();
    }
  }

  isAnimateSwim(arr) {
    if (this.currentImage % arr.length === 0) {
      this.animationCount++;
      this.currentImage = 0;
    }
  }

  isAnimateAttack() {
    if (this.currentImage >= this.IMAGES_ATT.length) {
      this.animationCount = 0;
      this.currentImage = 0;
    }
  }
}
