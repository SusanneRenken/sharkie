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

  constructor(world) {
    super();
    this.world = world;
    this.backgroundRepeat = this.world.backgroundRepeat;

    this.getParameter();
    this.getObjectProperties();
    this.getImages();

    this.animate();
  }

  getParameter() {
    this.width = 1041 * mainScale;
    this.height = 1216 * mainScale;

    this.x = 2 * mainWidth * this.backgroundRepeat - 1.3 * this.width;
    this.y = -mainHeight;
    this.introduceStartX =
      2 * mainWidth * (this.backgroundRepeat - 0.5) - 1 * this.width;

    this.offsetX = 50 * mainScale;
    this.offsetY = 575 * mainScale;
    this.offsetwidth = this.width - 100 * mainScale;
    this.offsetheight = this.height - 800 * mainScale;
  }

  getObjectProperties() {
    this.objectLife = 3;
    this.enemyAttack = "IMAGES_HIT_A";
    this.enemyAttackForDeath = "IMAGES_DEAD_A";
    this.enemyAttackRepeat = 1;
    this.enemyAttackSpeed = 30;
    this.enemyAttackSound = SOUND_CHARACTER_HIT_A;
    this.enemyAttackDeadSound = SOUND_CHARACTER_DEAD_A;
    this.speed = 1;
  }

  getImages() {
    this.IMAGES_INT = this.loadAllImages("./img/enemy/endboss", "int", 10);
    this.IMAGES_SWIM = this.loadAllImages("./img/enemy/endboss", "swim", 13);
    this.IMAGES_ATT = this.loadAllImages("./img/enemy/endboss", "attack", 6);
    this.IMAGES_HURT = this.loadAllImages("./img/enemy/endboss", "hurt", 4);
    this.IMAGES_DEAD = this.loadAllImages("./img/enemy/endboss", "dead", 6);
  }

  animate() {
    setInterval(() => {
      if (
        !this.introduceComplete &&
        this.introduceNotStarted &&
        //Hier brauche ich noch eine Flag !!! Damit der Boss kommt, auch wenn ich wieder aus dem x Bereich verschwinde
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
