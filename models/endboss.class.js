class Endboss extends MovableObject {
  introduceStarted = false;
  introduceComplete = false;
  introduceStartX;
  IMAGES_INT;
  IMAGES_SWIM;
  IMAGES_ATT;
  IMAGES_HIT;
  IMAGES_DEAD;
  endBossIsHit = false;
  world;
  objectLife;
  lifeObjects = [];

  constructor(world) {
    super();
    this.world = world;

    this.getParameter();
    this.getObjectProperties();
    this.getSwimParameter();
    this.getImages();

    this.createLifeObjects(this.objectLife, "./img/enemy/endboss/heart-full.png");
    this.animate();
  }

  getParameter() {
    this.width = 1041 * mainScale;
    this.height = 1216 * mainScale;

    this.x = 2 * mainWidth * this.world.backgroundRepeat - 1.3 * this.width;
    this.y = -mainHeight;
    this.introduceStartX =
      2 * mainWidth * (this.world.backgroundRepeat - 0.5) - 1 * this.width;
  }

  getSwimParameter() {
    this.offsetX = 80 * mainScale;
    this.offsetY = 650 * mainScale;
    this.offsetwidth = this.width - 160 * mainScale;
    this.offsetheight = this.height - 900 * mainScale;
  }

  getAttackParameter() {
    this.offsetX = 200 * mainScale;
    this.offsetY = 460 * mainScale;
    this.offsetwidth = this.width - 320 * mainScale;
    this.offsetheight = this.height - 680 * mainScale;
  }

  getObjectProperties() {
    this.objectLife = 3;
    this.speed = 1 + (this.world.gameLevel - 1) / 2;
    this.enemyAttack = "IMAGES_HIT_A";
    this.enemyAttackForDeath = "IMAGES_DEAD_A";
    this.enemyAttackRepeat = 1;
    this.enemyAttackSpeed = 30;
    this.enemyAttackSound = SOUND_CHARACTER_HIT_A;
    this.enemyAttackDeadSound = SOUND_CHARACTER_DEAD_A;
  }

  getImages() {
    this.IMAGES_INT = this.loadAllImages("./img/enemy/endboss", "int", 10);
    this.IMAGES_SWIM = this.loadAllImages("./img/enemy/endboss", "swim", 13);
    this.IMAGES_ATT = this.loadAllImages("./img/enemy/endboss", "attack", 6);
    this.IMAGES_HIT = this.loadAllImages("./img/enemy/endboss", "hurt", 4);
    this.IMAGES_DEAD = this.loadAllImages("./img/enemy/endboss", "dead", 6);
  }

  createLifeObjects(objectLife, imagePath) {
    const existingObjectsCount = this.lifeObjects.length;
    for (let i = 0; i < objectLife; i++) {
      const life = new EndBossLife(this, i + existingObjectsCount, imagePath);
      this.lifeObjects.push(life);
    }
  }

  animate() {
    this.animationIntervalId = setInterval(() => {
      if (!this.isDead) {
        if (this.world.character.x > this.introduceStartX) {
          this.introduceStarted = true;
        }
        if (!this.introduceComplete && this.introduceStarted) {
          this.animateIntroduce();
        } else if (this.introduceComplete && !this.endBossIsHit) {
          this.animateSwimAndAttack();
        } else if (this.endBossIsHit) {
          this.animateHit();
        }
      }
    }, 250);

    this.movementIntervalId = setInterval(() => {
      this.animateEndBossLife();
      if (this.introduceComplete && !this.endBossIsHit) {
        this.moveLeft(this.speed);
      }
      if (this.isDead) {
        this.moveUp(5);
      }
    }, 1000 / 60);
  }

  animateIntroduce() {
    this.y = -70;
    SOUND_ENDBOSS_INTRODUCE.play();
    this.animateMoving(this.IMAGES_INT);
    if (this.currentImage >= this.IMAGES_INT.length) {
      this.introduceComplete = true;
      this.currentImage = 0;
    }
  }

  animateSwimAndAttack() {
    if (this.animationCount < 1) {
      SOUND_ENDBOSS_ATTACK.play();
      this.speed = 3;
      this.animateMoving(this.IMAGES_ATT);
      this.isAnimateSwim(this.IMAGES_ATT);
    } else if (this.animationCount === 1) {
      this.speed = 2;
      // SOUND_ENDBOSS_ATTACK.play();
      this.animateMoving(this.IMAGES_SWIM);
      this.handleHitBox();
      this.isAnimateAttack();
    }
  }

  isAnimateSwim(arr) {
    if (this.currentImage % arr.length === 0) {
      this.animationCount++;
      this.currentImage = 0;
    }
  }

  handleHitBox() {
    if (this.currentImage === 1) {
      this.getAttackParameter();
    }
    if (this.currentImage === 4) {
      this.getSwimParameter();
    }
  }

  isAnimateAttack() {
    if (this.currentImage >= this.IMAGES_SWIM.length) {
      this.animationCount = 0;
      this.currentImage = 0;
    }
  }

  animateHit() {
    SOUND_ENDBOSS_ATTACK.pause();
    if (!this.isHitStart) {
      this.isHitStart = true;
      this.handleEndBossLife();
      this.currentImage = 0;
    }
    if (this.objectLife > 0) {
      this.animateHitAnimation();
    } else {
      this.animateDeathAnimation();
    }
  }

  handleEndBossLife() {
    this.objectLife -= 0.5;

    this.fullHeart = Math.floor(this.objectLife); // 3
    this.halfeHeart = this.objectLife - this.fullHeart === 0.5 ? 1 : 0; // 1

    this.lifeObjects = [];
    this.createLifeObjects(this.fullHeart, "./img/enemy/endboss/heart-full.png");
    this.createLifeObjects(this.halfeHeart, "./img/enemy/endboss/heart-half.png");


  }

  animateHitAnimation() {
    // add sound boss hit
    this.animateMoving(this.IMAGES_HIT);
    if (this.currentImage >= this.IMAGES_HIT.length) {
      this.isHitStart = false;
      this.endBossIsHit = false;
      this.animationCount = 0;
      this.currentImage = 0;
    }
  }

  animateDeathAnimation() {
    // add sound boss dead
    this.animateMoving(this.IMAGES_DEAD);
    if (this.currentImage >= this.IMAGES_DEAD.length) {
      this.isDead = true;
      setTimeout(() => {
        this.stopAllIntervals();
      }, 3000);
    }
  }

  animateEndBossLife() {
    this.lifeObjects.forEach((life) => {
      life.updatePosition();
      this.world.addToMap(life);
    });
  }
}
