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

  /**
   * Sets the initial parameters for the endboss, such as position and size.
   */
  getParameter() {
    this.width = 1041;
    this.height = 1216;

    this.x = 2 * 1920 * this.world.backgroundRepeat - 1.3 * this.width;
    this.y = -1080;
    this.introduceStartX =
      2 * 1920 * (this.world.backgroundRepeat - 0.5) - 1 * this.width;
  }

  /**
   * Sets the parameters for the swim hitbox of the endboss.
   */
  getSwimParameter() {
    this.offsetX = 130;
    this.offsetY = 650;
    this.offsetwidth = this.width - 240;
    this.offsetheight = this.height - 900;
  }

  /**
   * Sets the parameters for the attack hitbox of the endboss.
   */
  getAttackParameter() {
    this.offsetX = 30;
    this.offsetY = 650;
    this.offsetwidth = this.width - 240;
    this.offsetheight = this.height - 900;
  }

  /**
   * Sets properties for the endboss, such as life, speed, and attack parameters.
   */
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

  /**
   * Loads all the images required for different animations of the endboss.
   */
  getImages() {
    this.IMAGES_INT = this.loadAllImages("./img/enemy/endboss", "int", 10);
    this.IMAGES_SWIM = this.loadAllImages("./img/enemy/endboss", "swim", 13);
    this.IMAGES_ATT = this.loadAllImages("./img/enemy/endboss", "attack", 6);
    this.IMAGES_HIT = this.loadAllImages("./img/enemy/endboss", "hurt", 4);
    this.IMAGES_DEAD = this.loadAllImages("./img/enemy/endboss", "dead", 6);
  }

  /**
   * Creates life objects for the endboss based on its life.
   * @param {number} objectLife - The number of life objects to create.
   * @param {string} imagePath - The path to the image for the life object.
   */
  createLifeObjects(objectLife, imagePath) {
    const existingObjectsCount = this.lifeObjects.length;
    for (let i = 0; i < objectLife; i++) {
      const life = new EndBossLife(this, i + existingObjectsCount, imagePath);
      this.lifeObjects.push(life);
    }
  }

  /**
   * Starts the animation intervals for the endboss.
   */
  animate() {
    this.setAnimationInterval();
    this.setMovmentInterval();
  }

  /**
   * Sets the interval for animating the endboss based on its current state.
   */
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

  /**
   * Sets the interval for controlling the movement of the endboss.
   */
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

  /**
   * Animates the introduction of the endboss when it first appears.
   */
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

  /**
   * Animates the swimming and attacking actions of the endboss.
   */
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

  /**
   * Checks if the endboss attack animation has completed.
   * @param {Array} arr - Array of image paths for the animation.
   */
  isAnimateAttack(arr) {
    if (this.currentImage % arr.length === 0) {
      this.animationCount++;
      this.currentImage = 0;
    }
  }

  /**
   * Adjusts the hitbox during the attack animation.
   */
  handleHitBox() {
    if (this.currentImage === 1) {
      this.getAttackParameter();
    }
    if (this.currentImage === 4) {
      this.getSwimParameter();
    }
  }

  /**
   * Resets the animation state for swimming after an attack.
   */
  isAnimateSwim() {
    if (this.currentImage >= this.IMAGES_SWIM.length) {
      this.animationCount = 0;
      this.currentImage = 0;
    }
  }

  /**
   * Animates the endboss getting hit.
   */
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

  /**
   * Updates the endboss's life display based on the remaining life.
   */
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

  /**
   * Animates the endboss when it is hit.
   */
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

  /**
   * Animates the death of the endboss and ends the game if successful.
   */
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

  /**
   * Animates the life indicators of the endboss.
   */
  animateEndBossLife() {
    this.lifeObjects.forEach((life) => {
      life.updatePosition();
      this.world.addToMap(life);
    });
  }
}
