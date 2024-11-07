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
    this.animate();
  }

  getParameter() {
    this.width = 1041;
    this.height = 1216;

    this.x = 2 * 1920 * this.world.backgroundRepeat - 1.3 * this.width;
    this.y = -1080;
    this.introduceStartX =
      2 * 1920 * (this.world.backgroundRepeat - 0.5) - 1 * this.width;
  }

  getSwimParameter() {
    this.offsetX = 130;
    this.offsetY = 650;
    this.offsetwidth = this.width - 240;
    this.offsetheight = this.height - 900;
  }

  getAttackParameter() {
    this.offsetX = 30;
    this.offsetY = 650;
    this.offsetwidth = this.width - 240;
    this.offsetheight = this.height - 900;
  }

  getObjectProperties() {
    this.objectLife = Math.min(this.world.levelFactorHigh + 1, 20);
    this.speed = 6 + 0.5 * this.world.currentLevel;
    this.enemyAttack = "IMAGES_HIT_A";
    this.enemyAttackForDeath = "IMAGES_DEAD_A";
    this.enemyAttackRepeat = 2;
    this.enemyAttackSpeed = 40 + this.speed;
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
    this.setAnimationInterval();
    this.setMovmentInterval();
  }

  setAnimationInterval() {
     
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
  }

  setMovmentInterval() {
    this.movementIntervalId = setInterval(() => {
      this.animateEndBossLife();
      if (this.introduceComplete && !this.endBossIsHit) {
        this.moveLeft(this.speed);
      }
      if (this.isDead) {
        this.moveUp(5);
      }
      if (this.x < -1100) {
        gameOver();
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
      this.createLifeObjects(
        this.objectLife,
        "./img/enemy/endboss/heart-full.png"
      );
    }
  }

  animateSwimAndAttack() {
    if (this.animationCount < 1) {
      SOUND_ENDBOSS_ATTACK.play();
      this.speed = 6 + 0.5 * this.world.currentLevel;
      this.animateMoving(this.IMAGES_ATT);      
      this.handleHitBox();
      this.isAnimateAttack(this.IMAGES_ATT);
    } else if (this.animationCount === 1) {
      this.speed = 6 + 0.5 * this.world.currentLevel;
      this.animateMoving(this.IMAGES_SWIM);
      this.isAnimateSwim();
    }
  }

  isAnimateAttack(arr) {
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

  isAnimateSwim() {
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
    if (this.objectLife <= 0) {
      this.objectLife = 0;
    }
    this.fullHeart = Math.floor(this.objectLife);
    this.halfeHeart = this.objectLife - this.fullHeart === 0.5 ? 1 : 0;

    this.lifeObjects = [];
    this.createLifeObjects(
      this.fullHeart,
      "./img/enemy/endboss/heart-full.png"
    );
    this.createLifeObjects(
      this.halfeHeart,
      "./img/enemy/endboss/heart-half.png"
    );
  }

  animateHitAnimation() {
    SOUND_ENDBOSS_HIT.play();
    this.animateMoving(this.IMAGES_HIT);
    if (this.currentImage >= this.IMAGES_HIT.length) {
      this.isHitStart = false;
      this.endBossIsHit = false;
      this.animationCount = 0;
      this.currentImage = 0;
    }
  }

  animateDeathAnimation() {
    SOUND_ENDBOSS_DEAD.play();
    this.animateMoving(this.IMAGES_DEAD);
    if (this.currentImage >= this.IMAGES_DEAD.length) {
      this.isDead = true;
      setTimeout(() => {
        this.stopAllIntervals();
        winLevel();
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
