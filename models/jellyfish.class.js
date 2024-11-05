class Jellyfish extends MovableObject {
  COLOR = ["melon", "lila", "pink", "yellow"];
  IMAGES_SWIM;
  IMAGES_DEAD;
  urX;
  urY;
  direction;
  isMovingDown = true;
  parabolaStarted = false;

  constructor(world, x) {
    super();
    this.world = world;

    this.getRandomColor();
    this.getParameter(x);
    this.getObjectProperties();
    this.getImages();
    this.getAttack();

    this.animate();
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.COLOR.length);
    this.selectedColor = this.COLOR[randomIndex];
  }

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

  getObjectProperties() {
    this.objectLife = 1;
    this.speed = 1 + Math.random() * 1;
    this.movementSpeed = 180 + this.speed * 30;
    this.isDying = false;
  }

  getImages() {
    this.IMAGES_SWIM = this.loadAllImages("./img/enemy/jellyfish", "swim", 4);
    this.IMAGES_DEAD = this.loadAllImages("./img/enemy/jellyfish", "dead", 4);
  }

  getAttack() {
    if (this.selectedColor === "melon" || this.selectedColor === "pink") {
      this.getElectricAttack();
    } else {
      this.getPoisonAttack();
    }
  }

  getElectricAttack() {
    this.enemyAttack = "IMAGES_HIT_E";
    this.enemyAttackForDeath = "IMAGES_DEAD_E";
    this.enemyAttackRepeat = 2;
    this.enemyAttackSpeed = 20;
    this.enemyAttackSound = SOUND_CHARACTER_HIT_E;
    this.enemyAttackDeadSound = SOUND_CHARACTER_DEAD_E;
  }

  getPoisonAttack() {
    this.enemyAttack = "IMAGES_HIT_P";
    this.enemyAttackForDeath = "IMAGES_DEAD_A";
    this.enemyAttackRepeat = 1;
    this.enemyAttackSpeed = 20;
    this.enemyAttackSound = SOUND_CHARACTER_HIT_P;
    this.enemyAttackDeadSound = SOUND_CHARACTER_DEAD_A;
  }

  animate() {
    this.setAnimationInterval();
    this.setSecondaryIntervalId();
    this.setMovmentInterval();
  }

  setAnimationInterval(){
    this.animationIntervalId = setInterval(() => {
      if (!this.isDying) {
        this.animateMoving(this.IMAGES_SWIM);
      }
    }, this.movementSpeed);
  }

  setSecondaryIntervalId(){
    this.secondaryIntervalId = setInterval(() => {
      if (this.isDying) {
        this.animateDying();
      }
    }, 60);
  }

  setMovmentInterval(){
    this.movementIntervalId = setInterval(() => {
      if (!this.isDying) {
        this.handleSwimMovment();
      } else {
        this.handleDeadMovement();
      }
    }, 1000 / 60);
  }

  animateDying() {
    if (!this.deadSound) {
      SOUND_JELLY_DEAD.play();
      this.deadSound = true;
    }
    this.animateMoving(this.IMAGES_DEAD);

    setTimeout(() => {
      this.world.enemies = this.world.enemies.filter((enemy) => enemy !== this);
      this.stopAllIntervals();
    }, 2000);
  }

  handleSwimMovment() {
    const upperLimit = 0 * 1080;
    const lowerLimit = 0.7 * 1080;
    if (this.y >= lowerLimit || this.y <= upperLimit) {
      this.isMovingDown = !this.isMovingDown;
    }
    this.y += this.isMovingDown ? this.speed : -this.speed;
  }

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
