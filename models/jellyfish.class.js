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
    this.width = 211 * mainScale;
    this.height = 300 * mainScale;

    this.x = x;
    this.y = 0.1 * mainHeight;
 
    this.offsetX = 30 * mainScale;
    this.offsetY = 50 * mainScale;
    this.offsetwidth = this.width - 60 * mainScale;
    this.offsetheight = this.height - 100 * mainScale;
  }

  getObjectProperties() {
    this.objectLife = 1;
    this.speed = 0.5 + Math.random() * 0.5;
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
    this.animationIntervalId = setInterval(() => {
      if (!this.isDying) {
        this.animateMoving(this.IMAGES_SWIM);
      }
    }, this.movementSpeed);

    this.deadIntervalId = setInterval(() => {
      if (this.isDying) {
        this.animateDying();
      }
    }, 60);

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
    const upperLimit = 0 * mainHeight;
    const lowerLimit = 0.7 * mainHeight;
    if (this.y >= lowerLimit || this.y <= upperLimit) {
      this.isMovingDown = !this.isMovingDown;
    }
    this.y += this.isMovingDown ? this.speed : -this.speed;
  }

  handleDeadMovement(){
    if (!this.parabolaStarted) {
      this.urX = this.x;
      this.urY = this.y;
      this.parabolaStarted = true;
    }
    this.x += 5 * this.direction;
    const PARABOLA_WIDTH = 0.002;
    this.y = -(PARABOLA_WIDTH * Math.pow(this.x - this.urX, 2)) + this.urY;

  }
}
