class World {
  level = getLevel1();
  gameLevel = 1;
  gameLevelFactor = Math.floor(this.gameLevel / 2 + 0.5);
  pathBackgroundObjeckts = this.level.backgroundObjects;
  backgroundRepeat = this.level.backgroundRepeat;
  coinCollectionWidth = 1000 * mainScale;

  character = new Character(this);
  sunlight = new Sunlight(this);
  endBoss = new Endboss(this);
  statusBar = new StatusBar(this);

  backgroundObjeckts = [];
  coins = [];
  xCoinPlaces = [];
  barrierAreas = [];
  barriers = [];
  poisons = [];
  enemies = [];
  bubbles = [];

  isAttack = false;
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
    this.levelEndX = this.backgroundRepeat * 2 * mainWidth - mainWidth;
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
    let numberOfEnemies =
      this.level.backgroundRepeat * (1 + this.gameLevelFactor);

    for (let i = 0; i < numberOfEnemies; i++) {
      this.enemies.push(
        Math.random() < 0.5 ? new Pufferfish(this) : this.createJelly()
      );
    }
  }

  createJelly() {
    let lengthJellyArea = 2 * mainWidth * (this.level.backgroundRepeat - 1.2);
    let placedJelly = 0;

    while (placedJelly < 1) {
      const jellyX = mainWidth + Math.random() * lengthJellyArea;

      if (!isObjectInBarrier(jellyX, 220, this.barriers)) {
        placedJelly++;
        return new Jellyfish(this, jellyX);
      }
    }
  }

  placePoison() {
    let lengthPoisonArea = 2 * mainWidth * (this.backgroundRepeat - 1.2);

    let placedPoisons = 0;

    while (placedPoisons < (this.backgroundRepeat - 1) * 2) {
      const poisonX = mainWidth + Math.random() * lengthPoisonArea;

      if (!isObjectInBarrier(poisonX, 190, this.barriers)) {
        this.poisons.push(new Poison(poisonX, this));
        placedPoisons++;
      }
    }
  }

  checkCollisions() {
    setInterval(() => {
      collisionWithCoin(this);
      collisionWithPoison(this);
      collisionWithEnemie(this);
      collisionBubbleWithEnemie(this);
      collisionWithEndboss(this);
      collisionBubbleWithEndboss(this);
    }, 0);
  }

  setAttack() {
    setInterval(() => {
      if (
        isAttackKeyPressed(this.character) &&
        !this.isAttack &&
        !this.isHit
      ) {
        this.isAttack = true;
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
    this.addObjectsToMap(this.barriers);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.poisons);
    this.addObjectsToMap(this.bubbles);
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
    // mo.drawFrame(this.ctx);

    this.ctx.restore();
  }

  reflectObject(centerX, centerY) {
    this.ctx.translate(centerX, centerY);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-centerX, -centerY);
  }
}
