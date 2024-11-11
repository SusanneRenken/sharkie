class Pufferfish extends MovableObject {
  COLOR = ["green", "orange", "red"];
  IMAGES_SWIM;
  IMAGES_TRANSITION;
  IMAGES_BUBBLESWIM;
  IMAGES_DEAD;
  bubble = false;

  constructor(world) {
    super();
    this.world = world;
    this.isDying = false;
    this.animationIntervalId = null;
    this.movementIntervalId = null;

    this.getRandomColor();
    this.getParameter();
    this.getObjectProperties();
    this.getAttackProperties();
    this.getImages();

    this.animate();
  }

  /**
   * Selects a random color for the pufferfish.
   */
  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.COLOR.length);
    this.selectedColor = this.COLOR[randomIndex];
  }

  /**
   * Sets the initial position and size of the pufferfish.
   */
  getParameter() {
    this.width = 241;
    this.height = 198;

    this.x =
      1920 + Math.random() * (2 * 1920 * (this.world.backgroundRepeat - 1.2));
    this.y = Math.random() * (1080 - this.height);

    this.offsetX = 20;
    this.offsetY = 20;
    this.offsetwidth = this.width - 60;
    this.offsetheight = this.height - 80;
  }

  /**
   * Sets various properties of the pufferfish, including speed and direction.
   */
  getObjectProperties() {
    this.objectLife = 1;
    this.otherDirection = Math.random() < 0.5 ? false : true;
    this.speed =
      0.5 +
      this.world.currentLevel / 3 +
      Math.random() * this.world.levelFactorHigh;
    if (this.otherDirection) {
      this.speed = -this.speed;
    }
    this.movementSpeed = 100 + this.speed * 30;
  }

  /**
   * Sets the attack properties of the pufferfish.
   */
  getAttackProperties() {
    this.enemyAttack = "IMAGES_HIT_P";
    this.enemyAttackForDeath = "IMAGES_DEAD_A";
    this.enemyAttackRepeat = 1;
    this.enemyAttackSpeed = 20;
    this.enemyAttackSound = SOUND_CHARACTER_HIT_P;
    this.enemyAttackDeadSound = SOUND_CHARACTER_DEAD_A;
    this.animationRepeat = Math.floor(3 + Math.random() * 4);
  }

  /**
   * Loads all necessary images for the pufferfish animations.
   */
  getImages() {
    this.IMAGES_SWIM = this.loadAllImages("./img/enemy/pufferfish", "swim", 5);
    this.IMAGES_TRANSITION = this.loadAllImages(
      "./img/enemy/pufferfish",
      "transition",
      5
    );
    this.IMAGES_BUBBLESWIM = this.loadAllImages(
      "./img/enemy/pufferfish",
      "bubbleswim",
      5
    );
    this.IMAGES_DEAD = this.loadAllImages("./img/enemy/pufferfish", "dead", 3);
  }

  /**
   * Starts the animation and movement of the pufferfish.
   */
  animate() {
    this.setAnimationInterval();
    this.setMovmentInterval();
  }

  /**
   * Sets the interval for animating the pufferfish's actions.
   */
  setAnimationInterval() {
    this.animationIntervalId = setInterval(() => {
      if (this.isDying) {
        this.animateDying();
      } else if (this.animationCount < this.animationRepeat) {
        this.animateMoving(this.IMAGES_SWIM);
        this.countAnimationRepeat(this.IMAGES_SWIM);
      } else if (this.animationCount === this.animationRepeat) {
        this.animateMoving(this.IMAGES_TRANSITION);
        this.isAnimateTransition(true);
      } else if (
        this.animationCount > this.animationRepeat &&
        this.animationCount < 2 * this.animationRepeat + 1
      ) {
        this.bubble = true;
        this.getBubbleswimParameter();
        this.animateMoving(this.IMAGES_BUBBLESWIM);
        this.countAnimationRepeat(this.IMAGES_BUBBLESWIM);
      } else if (this.animationCount === 2 * this.animationRepeat + 1) {
        this.bubble = false;
        this.getSwimParameter();
        this.animateMovingReverse(this.IMAGES_TRANSITION);
        this.isAnimateTransition(false);
      }
    }, this.movementSpeed);
  }

  /**
   * Sets the interval for controlling the pufferfish's movement.
   */
  setMovmentInterval() {
    this.movementIntervalId = setInterval(() => {
      if (this.isDying) {
        this.handleDeadMovement();
      } else {
        this.setMovmentDirection();
        this.moveLeft(this.speed);
      }
    }, 1000 / 60);
  }

  /**
   * Adjusts the movement direction of the pufferfish at random intervals.
   */
  setMovmentDirection() {
    if (Math.random() < 1 / (60 * 10)) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
    }
    if (this.x < -100) {
      this.speed = -this.speed;
      this.otherDirection = true;
    }
    if (this.x > this.world.levelEndX + 1600) {
      this.speed = -this.speed;
      this.otherDirection = false;
    }
  }

  /**
   * Adjusts the hitbox offset when the pufferfish is swimming.
   */
  getSwimParameter() {
    this.offsetheight = this.height - 80;
  }

  /**
   * Adjusts the hitbox offset when the pufferfish is in bubble swim mode.
   */
  getBubbleswimParameter() {
    this.offsetheight = this.height - 40;
  }

  /**
   * Handles the transition animation state.
   * @param {boolean} countUp - Whether to count up or reset the animation.
   */
  isAnimateTransition(countUp) {
    if (this.currentImage >= this.IMAGES_TRANSITION.length) {
      if (countUp) {
        this.animationCount++;
      } else {
        this.animationCount = 0;
      }
      this.currentImage = 0;
    }
  }

  /**
   * Animates the pufferfish dying sequence and removes it after completion.
   */
  animateDying() {
    let imgIndex = this.getDyingImage();
    this.startDyingSound();

    this.img = this.imageCache[this.IMAGES_DEAD[imgIndex]];

    setTimeout(() => {
      this.world.enemies = this.world.enemies.filter((enemy) => enemy !== this);
      this.stopAllIntervals();
    }, 3000);
  }

  /**
   * Determines which image to use for the pufferfish dying sequence.
   * @returns {number} The index of the image to use.
   */
  getDyingImage() {
    let imgIndex = 1;
    if (this.bubble) {
      imgIndex = 0;
    } else if (this.y > 750) {
      imgIndex = 2;
    }
    return imgIndex;
  }

  /**
   * Starts playing the dying sound for the pufferfish.
   */
  startDyingSound() {
    if (!this.deadSound) {
      SOUND_PUFFER_DEAD.play();
      this.deadSound = true;
      hitPuffer++;
    }
  }

  /**
   * Handles the movement of the pufferfish when it is dying.
   */
  handleDeadMovement() {
    if (this.y < 900) {
      if (this.bubble) {
        this.moveUp(12);
      } else {
        this.moveDown(12);
      }
      if (!this.world.character.otherDirection) {
        this.moveRight(8);
      } else {
        this.moveLeft(8);
      }
    }
  }
}
