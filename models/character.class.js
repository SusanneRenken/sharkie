class Character extends MovableObject {
  width = 815 * mainScale * 0.9;
  height = 1000 * mainScale * 0.9;
  x = 0;
  y = -100;
  IMAGES_IDLE;
  IMAGES_SWIM;
  rotation = 0;
  world;

  constructor(characterSpeed) {
    super();

    this.IMAGES_IDLE = this.loadAllImages("./img/character", "idle", 18);
    this.IMAGES_SWIM = this.loadAllImages("./img/character", "swim", 6);

    this.speed = characterSpeed;
    this.verticalSpeed = 0.5 * characterSpeed;
    this.movementSpeed = 180;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isArrowkeyPressed()) {
        this.animateMoving(this.IMAGES_SWIM);
        SOUND_CHARACTER_SWIM.play();
      } else {
        this.animateMoving(this.IMAGES_IDLE);
        SOUND_CHARACTER_SWIM.pause();
      }
    }, 180);

    setInterval(() => {
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

  isArrowkeyPressed() {
    return (
      this.world.keyboard.ARROWRIGHT ||
      this.world.keyboard.ARROWLEFT ||
      this.world.keyboard.ARROWUP ||
      this.world.keyboard.ARROWDOWN
    );
  }

  isMovingRight() {
    return this.world.keyboard.ARROWRIGHT && this.x < this.world.levelEndX;
  }

  handleRightMovement() {
    this.moveRight(this.speed);
    if (this.world.keyboard.ARROWUP && this.y > -400 * mainScale) {
      this.moveUp(this.verticalSpeed);
      this.rotate = "up";
    } else if (this.world.keyboard.ARROWDOWN && this.y < 370 * mainScale) {
      this.moveDown(this.verticalSpeed);
      this.rotate = "down";
    } else {
      this.rotate = false;
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
      this.rotate = "up";
    } else if (this.world.keyboard.ARROWDOWN && this.y < 370 * mainScale) {
      this.moveDown(this.verticalSpeed);
      this.rotate = "down";
    } else {
      this.rotate = false;
    }
    this.otherDirection = true;
  }

  isMovingUp() {
    return this.world.keyboard.ARROWUP && this.y > -400 * mainScale;
  }

  handleUpMovement() {
    this.moveUp(this.verticalSpeed * 1.1);
  }

  isMovingDown() {
    return this.world.keyboard.ARROWDOWN && this.y < 370 * mainScale;
  }

  handleDownMovement() {
    this.moveDown(this.verticalSpeed * 1.1);
  }

  handleNoMovement() {
    this.rotate = false;
    this.otherDirection = false;
    if (this.y < 370 * mainScale) {
      this.moveDown(this.verticalSpeed * 0.1);
    }
  }
}
