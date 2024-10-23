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
  // rotation = 0;
  isAttack = false;
  isFinAttack = false;
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
      if (this.isFinAttack) {
        this.wakeUp();
        this.animateFinAttack();
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
      this.setAttack();
      if (this.isMovingRight()) {
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

  setAttack() {
    if (this.world.keyboard.KEYD && !this.isFinAttack) {
      this.isFinAttack = true;
    }
  }

  animateFinAttack() {
    if (!this.isAttack) {
      this.isAttack = true;
      this.currentImage = 0;
    }

    if (this.isFinAttack) {
      // SOUND_CHARACTER_FINSLAP.play();
      this.animateMoving(this.IMAGES_FIN);
      this.isAnimationComplete(this.IMAGES_FIN, "isFinAttack");
    }

    if (!this.isFinAttack) {
      // SOUND_CHARACTER_FINSLAP.pause();
      this.isAttack = false;
    }
  }

  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------

  isKeyPressed() {
    return Object.values(this.world.keyboard).some((value) => value);
  }

  isArrowkeyPressed() {
    return (
      this.world.keyboard.ARROWRIGHT ||
      this.world.keyboard.ARROWLEFT ||
      this.world.keyboard.ARROWUP ||
      this.world.keyboard.ARROWDOWN
    );
  }

  wakeUp() {
    this.lastActiveTime = Date.now();
    this.isSleeping = false;
    this.isAwake = true;
    SOUND_CHARACTER_SLEEP.pause();
  }

  isNoAction() {
    SOUND_CHARACTER_SWIM.pause();
    const currentTime = Date.now();
    if (currentTime - this.lastActiveTime <= 3000) {
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
      this.animateMoving(this.IMAGES_TRANS);
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
      // this.rotate = "up";
    } else if (this.world.keyboard.ARROWDOWN && this.y < 370 * mainScale) {
      this.moveDown(this.verticalSpeed);
      // this.rotate = "down";
    } else {
      // this.rotate = false;
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
      // this.rotate = "up";
    } else if (this.world.keyboard.ARROWDOWN && this.y < 370 * mainScale) {
      this.moveDown(this.verticalSpeed);
      // this.rotate = "down";
    } else {
      // this.rotate = false;
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
    // this.rotate = false;
    this.otherDirection = false;
    if (this.y < 290 * mainScale) {
      this.moveDown(this.verticalSpeed * 0.1);
    }
  }
}