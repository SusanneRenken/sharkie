class Character extends MovableObject {
  IMAGES_IDLE;
  IMAGES_SWIM;
  IMAGES_TRANS;
  IMAGES_SLEEP;
  IMAGES_FIN;
  IMAGES_BUB_N;
  IMAGES_BUB_P;
  IMAGES_HIT_A;
  IMAGES_HIT_E;
  IMAGES_HIT_P;
  isAttackStart = false;
  isHitStart = false;
  attackType;
  startAttackSound = 1;
  lastActiveTime = Date.now();
  isSleeping = false;
  isAwake = true;
  world;

  constructor(world) {
    super();
    this.world = world;

    this.getParameter();
    this.getObjectProperties();
    this.getImages();

    this.animate();
  }

  getParameter() {
    this.width = 815 * mainScale * 0.9;
    this.height = 1000 * mainScale * 0.9;
    this.x = 0;
    this.y = -100;
    this.offsetX = 160 * mainScale;
    this.offsetY = 460 * mainScale;
    this.offsetwidth = this.width - 320 * mainScale;
    this.offsetheight = this.height - 680 * mainScale;
  }

  getObjectProperties() {
    this.objectLife = 5;
    this.objectCoins = 0;
    this.objectPoisons = 0;
    this.speed = 5 + (this.world.gameLevel - 1) / 2;
    this.verticalSpeed = 0.5 * this.speed;
    this.movementSpeed = 180;
  }

  getImages() {    
    this.IMAGES_SWIM = this.loadAllImages("./img/character", "swim", 6);
    this.IMAGES_TRANS = this.loadAllImages("./img/character", "transition", 10);
    this.IMAGES_SLEEP = this.loadAllImages("./img/character", "sleep", 4);
    this.IMAGES_FIN = this.loadAllImages("./img/character", "at_fin-slap", 8);
    this.IMAGES_BUB_N = this.loadAllImages("./img/character", "at_bub_n", 8);
    this.IMAGES_BUB_P = this.loadAllImages("./img/character", "at_bub_p", 8);

    this.IMAGES_HIT_A = this.loadAllImages("./img/character", "hit_attack", 2);
    this.IMAGES_HIT_E = this.loadAllImages(
      "./img/character",
      "hit_electric",
      3
    );
    this.IMAGES_HIT_P = this.loadAllImages(
      "./img/character",
      "hit_poisoned",
      4
    );
    this.IMAGES_IDLE = this.loadAllImages("./img/character", "idle", 18);
  }

  animate() {
    setInterval(() => {
      if (this.world.isAttack) {
        this.wakeUp();
        this.animateAttack();
      } else if (this.world.isHit) {
        this.wakeUp();
        this.animateHit();
      } else if (this.isKeyPressed()) {
        this.wakeUp();
        if (this.isArrowkeyPressed()) {
          this.animateMoving(this.IMAGES_SWIM);
          // SOUND_CHARACTER_SWIM.play();
        }
      } else {
        this.isNoAction();
      }
    }, 180);

    setInterval(() => {
      if (this.world.isAttack) {
        this.handleFinAttackMoving();
      } else if (this.world.isHit) {
        this.handleHitMoving();
      } else if (this.isMovingRight()) {
        this.handleRightMovement();
      } else if (this.isMovingLeft()) {
        this.handleLeftMovement();
      } else if (this.isMovingUp()) {
        this.handleUpMovement();
      } else if (this.isMovingDown()) {
        this.handleDownMovement();
      } else {
        this.handleNoMovement();
      }

      this.world.camera_x = -this.x + 62 * mainScale;
    }, 1000 / 60);
  }

  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------

  isKeyPressed() {
    return this.isArrowkeyPressed() || this.isAttackkeyPressed();
  }

  isArrowkeyPressed() {
    return (
      this.world.keyboard.ARROWRIGHT ||
      this.world.keyboard.ARROWLEFT ||
      this.world.keyboard.ARROWUP ||
      this.world.keyboard.ARROWDOWN
    );
  }

  isAttackkeyPressed() {
    if (!this.world.isAttack) {
      if (this.world.keyboard.KEYD) {
        this.attackType = this.IMAGES_FIN;
        this.attackSound = SOUND_CHARACTER_ATTACK;
        this.startAttackSound = 5;
        return true;
      }
      if (this.world.keyboard.KEYS) {
        this.attackType = this.IMAGES_BUB_N;
        this.attackSound = SOUND_CHARACTER_BUB_N;
        this.startAttackSound = 7;
        return true;
      }
      if (this.world.keyboard.KEYW) {
        this.attackType = this.IMAGES_BUB_P;
        this.attackSound = SOUND_CHARACTER_BUB_P;
        this.startAttackSound = 7;
        return true;
      }
    }
  }

  wakeUp() {
    this.lastActiveTime = Date.now();
    this.isSleeping = false;
    this.isAwake = true;
    this.getAwakeParameter();
    SOUND_CHARACTER_SLEEP.pause();
  }

  getAwakeParameter() {
    this.offsetX = 160 * mainScale;
    this.offsetY = 460 * mainScale;
    this.offsetwidth = this.width - 320 * mainScale;
    this.offsetheight = this.height - 680 * mainScale;
  }

  animateAttack() {
    if (!this.isAttackStart) {
      this.isAttackStart = true;
      this.currentImage = 0;
    }
    if (this.world.isAttack) {
      this.animateMovingOnce(this.attackType);
      if (this.currentImage === this.startAttackSound) {
        this.attackSound.play();
      }
      if (this.currentImage >= this.attackType.length) {
        this.world.isAttack = false;
        this.isAttackStart = false;
        this.currentImage = 0;
      }
    }
  }

  animateHit() {
    this.animationRepeat = this.enemyAttackRepeat;
    if (!this.isHitStart) {
      this.isHitStart = true;
      this.currentImage = 0;
    }
    if (this.animationCount < this.animationRepeat) {
      this.hitSound.play();      
      this.animateMoving(this[this.enemyAttack]);
      this.countAnimationRepeat(this[this.enemyAttack]);
    } else if (this.animationCount === this.animationRepeat) {
      this.isHitStart = false;
      this.world.isHit = false;
      this.animationCount = 0;
    }
  }

  isNoAction() {
    SOUND_CHARACTER_SWIM.pause();
    const currentTime = Date.now();
    if (currentTime - this.lastActiveTime <= 8000) {
      this.animateMoving(this.IMAGES_IDLE);
    } else {
      this.animateSleeping();
    }
  }

  animateSleeping() {
    if (!this.isSleeping) {
      this.isSleeping = true;
      this.currentImage = 0;
    }
    if (this.isAwake) {
      // SOUND_CHARACTER_SLEEP.play();
      this.animateMovingOnce(this.IMAGES_TRANS);
      this.isAnimationComplete(this.IMAGES_TRANS, "isAwake");
    }
    if (!this.isAwake) {
      if (this.y >= 290 * mainScale) {
        this.y = 290 * mainScale;
      }
      this.getSleepingParameter();
      this.animateMoving(this.IMAGES_SLEEP);
    }
  }

  getSleepingParameter() {
    this.offsetX = 160 * mainScale;
    this.offsetY = 560 * mainScale;
    this.offsetwidth = this.width - 320 * mainScale;
    this.offsetheight = this.height - 700 * mainScale;
  }

  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  handleFinAttackMoving() {
    if (this.currentImage <= 1 && this.attackType === this.IMAGES_FIN) {
      if (this.otherDirection === false) this.moveRight(5);
      if (this.otherDirection === true) this.moveLeft(5);
    }
    if (this.currentImage >= 6 && this.attackType === this.IMAGES_FIN) {
      if (this.otherDirection === false) this.moveLeft(5);
      if (this.otherDirection === true) this.moveRight(5);
    }
  }

  handleHitMoving() {
    if (this.currentImage <= 2 && this.animationCount < 1) {
      if (this.otherDirection === false) this.moveLeft(this.enemyAttackSpeed);
      if (this.otherDirection === true) this.moveRight(this.enemyAttackSpeed);
    }
  }

  isMovingRight() {
    return this.world.keyboard.ARROWRIGHT && this.x < this.world.levelEndX;
  }

  handleRightMovement() {
    this.moveRight(this.speed);
    if (this.world.keyboard.ARROWUP && this.y > -400 * mainScale) {
      this.moveUp(this.verticalSpeed);
    } else if (this.world.keyboard.ARROWDOWN && this.y < 370 * mainScale) {
      this.moveDown(this.verticalSpeed);
    }
    this.otherDirection = false;
  }

  isMovingLeft() {
    return this.world.keyboard.ARROWLEFT && this.x > 0;
  }

  handleLeftMovement() {
    this.moveLeft(this.speed);
    if (this.world.keyboard.ARROWUP && this.y > -400 * mainScale) {
      this.moveUp(this.verticalSpeed);
    } else if (this.world.keyboard.ARROWDOWN && this.y < 370 * mainScale) {
      this.moveDown(this.verticalSpeed);
    }
    this.otherDirection = true;
  }

  isMovingUp() {
    return this.world.keyboard.ARROWUP && this.y > -400 * mainScale;
  }

  handleUpMovement() {
    this.moveUp(this.verticalSpeed * 1.2);
  }

  isMovingDown() {
    return this.world.keyboard.ARROWDOWN && this.y < 320 * mainScale;
  }

  handleDownMovement() {
    this.moveDown(this.verticalSpeed * 1.2);
  }

  handleNoMovement() {
    if (this.y < 290 * mainScale) {
      this.moveDown(this.verticalSpeed * 0.1);
    }
  }
}
