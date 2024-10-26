class Character extends MovableObject {
  width = 815 * mainScale * 0.9;
  height = 1000 * mainScale * 0.9;
  x = 0;
  y = -100;
  IMAGES_IDLE;
  IMAGES_SWIM;
  IMAGES_TRANS;
  IMAGES_SLEEP;
  IMAGES_FIN;
  IMAGES_BUB_N;
  IMAGES_BUB_P;
  isAttackStart = false;
  attackType;
  startAttackSound = 1;
  lastActiveTime = Date.now();
  isSleeping = false;
  isAwake = true;
  world;

  constructor(characterSpeed, world) {
    super();
    this.world = world;

    this.IMAGES_IDLE = this.loadAllImages("./img/character", "idle", 18);
    this.IMAGES_SWIM = this.loadAllImages("./img/character", "swim", 6);
    this.IMAGES_TRANS = this.loadAllImages("./img/character", "transition", 10);
    this.IMAGES_SLEEP = this.loadAllImages("./img/character", "sleep", 4);
    this.IMAGES_FIN = this.loadAllImages("./img/character", "at_fin-slap", 8);
    this.IMAGES_BUB_N = this.loadAllImages("./img/character", "at_bub_n", 8);
    this.IMAGES_BUB_P = this.loadAllImages("./img/character", "at_bub_p", 8);

    this.speed = characterSpeed;
    this.verticalSpeed = 0.5 * characterSpeed;
    this.movementSpeed = 180;

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.isAttack) {
        this.wakeUp();
        this.animateAttack();
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
        if (this.currentImage <= 1 && this.attackType === this.IMAGES_FIN) {
          if (this.otherDirection === false) this.moveRight(5);
          if (this.otherDirection === true) this.moveLeft(5);
        }
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
    SOUND_CHARACTER_SLEEP.pause();
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
      this.animateMoving(this.IMAGES_SLEEP);
    }
  }

  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------

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
