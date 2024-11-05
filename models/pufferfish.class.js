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
    this.getImages();

    this.animate();
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.COLOR.length);
    this.selectedColor = this.COLOR[randomIndex];
  }

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

  getObjectProperties() {
    this.objectLife = 1;
    this.enemyAttack = "IMAGES_HIT_P";
    this.enemyAttackForDeath = "IMAGES_DEAD_A";
    this.enemyAttackRepeat = 1;
    this.enemyAttackSpeed = 20;
    this.enemyAttackSound = SOUND_CHARACTER_HIT_P;
    this.enemyAttackDeadSound = SOUND_CHARACTER_DEAD_A;
    this.animationRepeat = Math.floor(3 + Math.random() * 4);
    this.speed = 0.6 + Math.random() * 1.2;
    this.movementSpeed = 100 + this.speed * 30;
  }

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

  animate() {
    this.setAnimationInterval();
    this.setMovmentInterval();
  }

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

  setMovmentInterval() {
    this.movementIntervalId = setInterval(() => {
      if (this.isDying) {
        this.handleDeadMovement();
      } else {
        this.moveLeft(this.speed);
      }
    }, 1000 / 60);
  }

  getSwimParameter() {
    this.offsetheight = this.height - 80;
  }

  getBubbleswimParameter() {
    this.offsetheight = this.height - 40;
  }

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

  animateDying() {
    let imgIndex = this.getDyingImage();
    this.startDyingSound();

    this.img = this.imageCache[this.IMAGES_DEAD[imgIndex]];

    setTimeout(() => {
      this.world.enemies = this.world.enemies.filter((enemy) => enemy !== this);
      this.stopAllIntervals();
    }, 3000);
  }

  getDyingImage() {
    let imgIndex = 1;
    if (this.bubble) {
      imgIndex = 0;
    } else if (this.y > 750) {
      imgIndex = 2;
    }
    return imgIndex;
  }

  startDyingSound() {
    if (!this.deadSound) {
      SOUND_PUFFER_DEAD.play();
      this.deadSound = true;
      hitPuffer++;      
    }
  }

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
