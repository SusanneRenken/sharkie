class World {
  currentLevel = level;
  pathBackgroundObjeckts = [
    "./img/background/layers/water/3.png",
    "./img/background/layers/fondo-2/3.png",
    "./img/background/layers/fondo-1/3.png",
    "./img/background/layers/floor/3.png",
  ];
  levelFactorLow = Math.floor(this.currentLevel / 2 + 0.5);
  levelFactorHigh = Math.floor(Math.pow(this.currentLevel * 5, 1 / 2.2));
  backgroundRepeat = this.levelFactorHigh;
  coinCollectionWidth = 1000;

  character = new Character(this);
  sunlight = new Sunlight(this);
  endBoss = new Endboss(this);
  statusBar = new StatusBar(this);

  backgroundObjeckts = [];
  coins = [];
  xCoinPlaces = [];
  barrierAreas = [];
  barriers = [];
  barrierHitboxes = [];
  poisons = [];
  enemies = [];
  bubbles = [];
  hearts = [];

  isAttack = false;
  isAttackKey = false;
  isHit = false;

  levelEndX;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.levelEndX = this.backgroundRepeat * 2 * 1920 - 1920;
    this.loadBackgroundObjects();
    this.placeCoins();
    this.placeBarriers();
    this.initializeEnemies();
    this.placePoison();
    this.draw();
    this.checkCollisions();
    this.setAttack();
  }

  loadBackgroundObjects() {
    this.pathBackgroundObjeckts.forEach((path) => {
      for (let index = -1; index < this.backgroundRepeat + 1; index++) {
        this.backgroundObjeckts.push(new BackgroundObject(path, index));
      }
    });
  }

  placeCoins() {
    getStartPlacesCoins(this);
    generateCoins(this);
  }

  placeBarriers() {    
    getBarrierAreas(this);
    checkBarrierAreas(this);
  }

  initializeEnemies() {
    let numberOfEnemies = this.backgroundRepeat * this.levelFactorHigh;

    for (let i = 0; i < numberOfEnemies; i++) {
      this.enemies.push(
        Math.random() < 0.5 ? new Pufferfish(this) : this.createJelly()
      );
    }
  }

  createJelly() {
    let lengthJellyArea = 2 * 1920 * (this.backgroundRepeat - 1.2);
    let placedJelly = 0;

    while (placedJelly < 1) {
      const jellyX = 1920 + Math.random() * lengthJellyArea;

      if (!isObjectInBarrier(jellyX, 220, this.barriers)) {
        placedJelly++;
        return new Jellyfish(this, jellyX);
      }
    }
  }

  placePoison() {
    let lengthPoisonArea = 2 * 1920 * (this.backgroundRepeat - 1.2);
    let placedPoisons = 0;
    let numberPoisons = Math.max(Math.min(this.levelFactorHigh + 1, 20), 5);

    while (placedPoisons < numberPoisons) {
      const poisonX = 1920 + Math.random() * lengthPoisonArea;

      if (!isObjectInBarrier(poisonX, 190, this.barriers)) {
        this.poisons.push(new Poison(poisonX, this));
        placedPoisons++;
      }
    }
  }

  checkCollisions() {
    setInterval(() => {
      collisionWithBarrier(this);
      collisionWithBarrierSleeping(this);
      collisionWithCoin(this);
      collisionWithPoison(this);
      collisionWithHearts(this);
      collisionWithEnemie(this);
      collisionWithEndboss(this);
      collisionBubbleWithBarrier(this);
      collisionBubbleWithEnemie(this);
      collisionBubbleWithEndboss(this);
    }, 0);
  }

  setAttack() {
    setInterval(() => {
      if (isAttackKeyPressed(this.character) && !this.isAttack && !this.isHit && !this.isAttackKey) {
        this.isAttack = true;
        this.isAttackKey = true;
      }

      if(areNoAttackKeysPressed(this.character) && this.isAttackKey){
        this.isAttackKey = false;
      }
    }, 0);
  }

  generateBubble(attackType) {
    this.bubbles.push(new Bubble(this, attackType));
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjeckts);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.sunlight);

    this.ctx.translate(this.camera_x, 0);
    // this.addToMap(this.sunlight);

    this.addObjectsToMap(this.barriers);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.poisons);
    this.addObjectsToMap(this.bubbles);
    this.addObjectsToMap(this.hearts);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.endBoss);
    this.addObjectsToMap(this.endBoss.lifeObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.save();
    const centerX = mo.x + mo.width / 2;
    const centerY = mo.y + mo.height / 2;

    if (mo.otherDirection) {
      this.reflectObject(centerX, centerY);
    }

    mo.drawObject(this.ctx);
    mo.drawFrame(this.ctx);

    this.ctx.restore();
  }

  reflectObject(centerX, centerY) {
    this.ctx.translate(centerX, centerY);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-centerX, -centerY);
  }
}
