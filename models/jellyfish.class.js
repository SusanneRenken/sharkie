class Jellyfish extends MovableObject {
  COLOR = ["melon", "lila", "pink", "yellow"];
  IMAGES_SWIM;
  IMAGES_DEAD;
  urX;
  urY;
  direction;
  isMovingDown = true;
  parabolaStarted = false;
  hasHeart;

  constructor(world, x) {
    super();
    this.world = world;

    this.getRandomParameter();
    this.getParameter(x);
    this.getObjectProperties();
    this.getImages();
    this.getAttack();

    this.animate();
  }

  /**
   * Assigns random parameters to the jellyfish, such as color and whether it has a heart.
   */
  getRandomParameter() {
    const randomIndex = Math.floor(Math.random() * this.COLOR.length);
    this.selectedColor = this.COLOR[randomIndex];
    this.hasHeart = Math.random() < 0.1 ? true : false;
  }

  /**
   * Sets initial parameters like size, position, and offsets for the jellyfish.
   * @param {number} x - The x-coordinate to place the jellyfish.
   */
  getParameter(x) {
    this.width = 211;
    this.height = 300;

    this.x = x;
    this.y = 0.1 * 1080;

    this.offsetX = 30;
    this.offsetY = 50;
    this.offsetwidth = this.width - 60;
    this.offsetheight = this.height - 100;
  }

  /**
   * Sets object properties such as speed, movement speed, and life.
   */
  getObjectProperties() {
    this.objectLife = 1;
    this.speed = 0.5 + this.world.currentLevel / 2.5 + Math.random() * 1;
    this.movementSpeed = 180 + this.speed * 30;
    this.isDying = false;
  }

  /**
   * Loads the images needed for jellyfish animations.
   */
  getImages() {
    this.IMAGES_SWIM = this.loadAllImages("./img/enemy/jellyfish", "swim", 4);
    this.IMAGES_DEAD = this.loadAllImages("./img/enemy/jellyfish", "dead", 4);
  }

  /**
   * Determines the type of attack the jellyfish has based on its color.
   */
  getAttack() {
    if (this.selectedColor === "melon" || this.selectedColor === "pink") {
      this.getElectricAttack();
    } else {
      this.getPoisonAttack();
    }
  }

  /**
   * Sets the properties for an electric attack.
   */
  getElectricAttack() {
    this.enemyAttack = "IMAGES_HIT_E";
    this.enemyAttackForDeath = "IMAGES_DEAD_E";
    this.enemyAttackRepeat = 2;
    this.enemyAttackSpeed = 20;
    this.enemyAttackSound = SOUND_CHARACTER_HIT_E;
    this.enemyAttackDeadSound = SOUND_CHARACTER_DEAD_E;
  }

  /**
   * Sets the properties for a poison attack.
   */
  getPoisonAttack() {
    this.enemyAttack = "IMAGES_HIT_P";
    this.enemyAttackForDeath = "IMAGES_DEAD_A";
    this.enemyAttackRepeat = 1;
    this.enemyAttackSpeed = 20;
    this.enemyAttackSound = SOUND_CHARACTER_HIT_P;
    this.enemyAttackDeadSound = SOUND_CHARACTER_DEAD_A;
  }

  /**
   * Starts the animation intervals for the jellyfish.
   */
  animate() {
    this.setAnimationInterval();
    this.setSecondaryIntervalId();
    this.setMovmentInterval();
  }

  /**
   * Sets the interval for animating the swimming of the jellyfish.
   */
  setAnimationInterval() {
    this.animationIntervalId = setInterval(() => {
      if (!this.isDying) {
        this.animateMoving(this.IMAGES_SWIM);
      }
    }, this.movementSpeed);
  }

  /**
   * Sets the interval for animating the jellyfish dying sequence.
   */
  setSecondaryIntervalId() {
    this.secondaryIntervalId = setInterval(() => {
      if (this.isDying) {
        this.animateDying();
      }
    }, 60);
  }

  /**
   * Sets the interval for controlling the movement of the jellyfish.
   */
  setMovmentInterval() {
    this.movementIntervalId = setInterval(() => {
      if (!this.isDying) {
        this.handleSwimMovment();
      } else {
        this.handleDeadMovement();
      }
    }, 1000 / 60);
  }

  /**
   * Animates the jellyfish dying sequence, plays sound, and removes the jellyfish from the world.
   */
  animateDying() {
    if (!this.deadSound) {
      SOUND_JELLY_DEAD.play();
      this.deadSound = true;
      hitJelly++;
      this.placeHeart();
    }
    this.animateMoving(this.IMAGES_DEAD);

    setTimeout(() => {
      this.world.enemies = this.world.enemies.filter((enemy) => enemy !== this);
      this.stopAllIntervals();
    }, 2000);
  }

  /**
   * Places a heart in the world if the jellyfish had one.
   */
  placeHeart() {
    if (this.hasHeart) {
      this.world.hearts.push(new Heart(this.world, this.x + 60, this.y + 50));
    }
  }

  /**
   * Handles the swimming movement of the jellyfish, switching direction at boundaries.
   */
  handleSwimMovment() {
    const upperLimit = 0 * 1080;
    const lowerLimit = 0.7 * 1080;
    if (this.y >= lowerLimit || this.y <= upperLimit) {
      this.isMovingDown = !this.isMovingDown;
    }
    this.y += this.isMovingDown ? this.speed : -this.speed;
  }

  /**
   * Handles the movement of the jellyfish when it is dying, following a parabolic path.
   */
  handleDeadMovement() {
    if (!this.parabolaStarted) {
      this.urX = this.x;
      this.urY = this.y;
      this.parabolaStarted = true;
    }
    this.x += 7 * this.direction;
    const PARABOLA_WIDTH = 0.002;
    this.y = -(PARABOLA_WIDTH * Math.pow(this.x - this.urX, 2)) + this.urY;
  }
}
