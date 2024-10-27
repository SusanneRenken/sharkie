class World {
  level = getLevel1();
  pathBackgroundObjeckts = this.level.backgroundObjects;
  backgroundObjeckts = [];
  backgroundRepeat = this.level.backgroundRepeat;
  levelEndX;
  sunlight = new Sunlight(
    this.level.sunlight,
    this.level.characterSpeed,
    this.backgroundRepeat,
    this
  );
  character = new Character(this.level.characterSpeed, this);
  isAttack = false;
  enemies = [];
  finalEnemy = new Endboss(this.backgroundRepeat, this);
  coins = [];
  coinCollectionWidth = 1000 * mainScale;
  xCoinPlaces = [];
  BARRIER_DIMENSIONS = [
    { barrierWidth: 1682 * mainScale, barrierHeight: 1080 * mainScale },
    { barrierWidth: 1415 * mainScale, barrierHeight: 649 * mainScale },
    { barrierWidth: 320 * mainScale, barrierHeight: 660 * mainScale },
  ];
  barriers = [];
  poisons = [];
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
    this.setAttack();
  }

  loadBackgroundObjects() {
    this.pathBackgroundObjeckts.forEach((path) => {
      for (let index = -1; index < this.backgroundRepeat; index++) {
        this.backgroundObjeckts.push(new BackgroundObject(path, index));
      }
    });
  }

  placeCoins() {
    getStartPlacesCoins(
      this.backgroundRepeat,
      this.xCoinPlaces,
      this.coinCollectionWidth
    );
    generateCoins(this.xCoinPlaces, this.coins);
  }

  placeBarriers() {
    let barrierAreas = [];
    let isBarrierPlaced = false;

    getBarrierAreas(barrierAreas, this.xCoinPlaces, this.coinCollectionWidth);
    checkBarrierAreas(
      barrierAreas,
      this.BARRIER_DIMENSIONS,
      isBarrierPlaced,
      this.barriers,
      this.xCoinPlaces,
      this.coinCollectionWidth
    );
  }

  initializeEnemies() {
    let numberOfEnemies = this.backgroundRepeat * 2;

    for (let i = 0; i < numberOfEnemies; i++) {
      let enemyClass = Math.random() < 0.5 ? Jellyfish : Pufferfish;

      if (enemyClass == Pufferfish) {
        this.enemies.push(new Pufferfish(this.backgroundRepeat));
      } else {
        this.placeJelly();
      }
    }
  }

  placeJelly() {
    let lengthJellyArea = 2 * mainWidth * (this.backgroundRepeat - 1.2);
    let placedJelly = 0;

    while (placedJelly < 1) {
      const jellyX = mainWidth + Math.random() * lengthJellyArea;

      if (!isObjectInBarrier(jellyX, 220, this.barriers)) {
        this.enemies.push(new Jellyfish(this.backgroundRepeat, jellyX));
        placedJelly++;
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

  // checkCollisions(){
  //   setInterval(() => {

      
  //   }, 1000);
  // }

  setAttack() {
    setInterval(() => {
      if (this.character.isAttackkeyPressed() && !this.isAttack) {
        this.isAttack = true;
      }
    }, 0);
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjeckts);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.sunlight);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.barriers);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.poisons);
    this.addToMap(this.character);
    this.addToMap(this.finalEnemy);
    this.ctx.translate(-this.camera_x, 0);

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
