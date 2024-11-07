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
  IMAGES_DEAD_A;
  IMAGES_DEAD_E;
  lastX;
  lastY;
  isAttackStart = false;
  isPoisonAttack = false;
  attackType;
  startAttack = 1;
  lastActiveTime = Date.now();
  isSleeping = false;
  isAwake = true;
  world;

  constructor(world) {
    super();
    this.world = world;

    getParameter(this);
    getSwimParameter(this);
    getObjectProperties(this);
    getImages(this);

    this.animate();
  }

  animate() {
    this.setAnimationInterval();
    this.setSecondaryIntervalId();
    this.setMovmentInterval();
  }

  setAnimationInterval() {         
    this.animationIntervalId = setInterval(() => {
      if (isAliveAndNotAttack(this)) {
        if (isKeyPressed(this) && isSleeping(this)) {
          this.wakeUp();
        } else if (this.world.isHit) {
          this.animateHit();
        } else if (isArrowkeyPressed(this)) {
          this.lastActiveTime = Date.now();
          this.animateMoving(this.IMAGES_SWIM);
          SOUND_CHARACTER_SWIM.play();
        } else {
          this.animateNoAction();
        }
      }
    }, 180);
  }


  setSecondaryIntervalId() {
    this.secondaryIntervalId = setInterval(() => {      
      if (isAliveAndAttack(this)) {
        this.animateAttack();
      }
    }, 80);
  }

  setMovmentInterval() {
    this.movementIntervalId = setInterval(() => {
      this.saveLastPosition();
      if (this.isAttackStart) {
        this.handleFinAttackMoving();
      } else if (this.isHitStart && this.animationCount < 1) {
        this.handleHitMoving();
      } else if (isMovingRight(this)) {
        this.handleRightMovement();
      } else if (isMovingLeft(this)) {
        this.handleLeftMovement();
      } else if (isMovingUp(this)) {
        this.handleUpMovement();
      } else if (isMovingDown(this)) {
        this.handleDownMovement();
      } else {
        this.handleNoMovement();
      }

      this.world.camera_x = -this.x + 162;
    }, 1000 / 60);
  }
  
  saveLastPosition() {
    this.lastX = this.x;
    this.lastY = this.y;
  }

  animateAttack() {
    this.lastActiveTime = Date.now();
    SOUND_CHARACTER_SWIM.pause();

    if (!this.isAttackStart) {
      this.isAttackStart = true;
      this.currentImage = 0;
    }

    if (this.world.isAttack) {
      setBubbleAttack(this);
      this.animateMoving(this.attackType);
      playAttackSound(this);
      stopAttack(this);
    }
  }

  animateHit() {
    this.lastActiveTime = Date.now();
    SOUND_CHARACTER_SWIM.pause();
    this.animationRepeat = this.enemyAttackRepeat;
    if (!this.isHitStart) {
      this.isHitStart = true;
      characterLife--;
      this.currentImage = 0;
      this.wakeUp();
    }
    if (characterLife > 0) {
      animateHitAnimation(this);
    } else {
      animateDeathAnimation(this);
    }
  }

  animateNoAction() {
    SOUND_CHARACTER_SWIM.pause();
    const currentTime = Date.now();
    if (currentTime - this.lastActiveTime <= 8000) {
      this.animateMoving(this.IMAGES_IDLE);
    } else {
      this.animateSleeping();
    }
  }

  wakeUp() {
    this.lastActiveTime = Date.now();
    this.isSleeping = false;
    this.isAwake = true;
    SOUND_CHARACTER_SLEEP.pause();
    getSwimParameter(this);
  }

  animateSleeping() {
    if (!this.isSleeping) {
      this.isSleeping = true;
      this.currentImage = 0;
    }
    isFallAsleep(this);
    isSleepingDeeply(this);
  }

  handleFinAttackMoving() {
    if (isFinAttackFirstMove(this)) {
      if (this.otherDirection === false) this.moveRight(18);
      if (this.otherDirection === true) this.moveLeft(18);
    }
    if (isFinAttackSecondMove(this)) {
      if (this.otherDirection === false) this.moveLeft(23);
      if (this.otherDirection === true) this.moveRight(23);
    }
  }

  handleHitMoving() {
    if (characterLife > 0) {
      if (this.world.endBoss.x > this.x) {
        this.moveLeft(this.enemyAttackSpeed);
    } else {
        this.moveRight(this.enemyAttackSpeed);
    }
    } else {
      if (isDeathByAttack(this)) {
        this.moveUp(5);
      }
      if (isDeathByElectric(this)) {
        this.moveDown(60);
      }
    }
  }

  handleRightMovement() {
    this.moveRight(this.speed);
    if (isInWorldUp(this)) {
      this.moveUp(this.verticalSpeed);
    } else if (isInWorldDown(this)) {
      this.moveDown(this.verticalSpeed);
    }
    this.otherDirection = false;
  }

  handleLeftMovement() {
    this.moveLeft(this.speed);
    if (isInWorldUp(this)) {
      this.moveUp(this.verticalSpeed);
    } else if (isInWorldDown(this)) {
      this.moveDown(this.verticalSpeed);
    }
    this.otherDirection = true;
  }

  handleUpMovement() {
    this.moveUp(this.verticalSpeed * 1.2);
  }

  handleDownMovement() {
    this.moveDown(this.verticalSpeed * 1.2);
  }

  handleNoMovement() {
    if (this.y < 290) {
      this.moveDown(this.verticalSpeed * 0.1);
    }
  }
}
