class World {
  level = getLevel1();
  pathBackgroundObjeckts = this.level.backgroundObjects;
  backgroundObjeckts = [];
  backgroundRepeat = this.level.backgroundRepeat;
  levelEndX;
  sunlight = new Sunlight(
    this.level.sunlight,
    this.level.characterSpeed,
    this.backgroundRepeat
  );
  character = new Character(this.level.characterSpeed);
  enemies = [];
  finalEnemy = new Finalenemy(this.backgroundRepeat);
  coins = [];
  coinCollectionWidth = 1000 * mainScale;
  xCoinPlaces = [];
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
    this.initializeEnemies();
    this.placeCoins();
    this.placeBarriers();
    this.placePoison();
    this.draw();
    this.setWorld();
  }

  loadBackgroundObjects() {
    this.pathBackgroundObjeckts.forEach((path) => {
      for (let index = -1; index < this.backgroundRepeat; index++) {
        this.backgroundObjeckts.push(new BackgroundObject(path, index));
      }
    });
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
    let lengthJellyArea = 2 * mainWidth * (this.backgroundRepeat - 1);
    let placedJelly = 0;

    while (placedJelly < 1) {
      const jellyX = mainWidth + Math.random() * lengthJellyArea;

      if (!this.isObjectInBarrier(jellyX, 220)) {
        this.enemies.push(new Jellyfish(this.backgroundRepeat, jellyX));
        placedJelly++;
      }
    }
  }

  isObjectInBarrier(objectX, objectWidth) {
    return this.barriers.some(
      (barrier) =>
        objectX >= barrier.x - 2 * objectWidth * mainScale &&
      objectX <= barrier.x + barrier.width + objectWidth * mainScale
    );
  }

  placeCoins() {
    getStartPlaces(
      this.backgroundRepeat,
      this.xCoinPlaces,
      this.coinCollectionWidth
    );
    generateCoins(this.xCoinPlaces, this.coins);
  }

  placeBarriers() {
    const BARRIER_DIMENSIONS = [
      { barrierWidth: 1682 * mainScale, barrierHeight: 1080 * mainScale },
      { barrierWidth: 1415 * mainScale, barrierHeight: 649 * mainScale },
      { barrierWidth: 320 * mainScale, barrierHeight: 660 * mainScale },
    ];

    let barrierAreas = [];
    let isBarrierPlaced = false;

    this.getBarrierAreas(barrierAreas);
    this.checkBarrierAreas(barrierAreas, BARRIER_DIMENSIONS, isBarrierPlaced);
  }

  getBarrierAreas(barrierAreas) {
    for (let i = 0; i < this.xCoinPlaces.length - 1; i++) {
      let areaWidth = Math.floor(
        this.xCoinPlaces[i + 1] - this.xCoinPlaces[i] - this.coinCollectionWidth
      );
      barrierAreas.push(areaWidth);
    }
  }

  checkBarrierAreas(barrierAreas, BARRIER_DIMENSIONS, isBarrierPlaced) {
    for (let i = 0; i < barrierAreas.length; i++) {
      const area = barrierAreas[i];
      for (let j = 0; j < 3; j++) {
        if (area > BARRIER_DIMENSIONS[j].barrierWidth && !isBarrierPlaced) {
          isBarrierPlaced = Math.random() < 0.7 ? true : false;
          if (isBarrierPlaced) {
            this.generateBarriers(BARRIER_DIMENSIONS, j + 1, i, area);
          }
        }
      }
      isBarrierPlaced = false;
    }
  }

  generateBarriers(BARRIER_DIMENSIONS, barrierNumber, i, area) {
    let width = BARRIER_DIMENSIONS[barrierNumber - 1].barrierWidth;
    let height = BARRIER_DIMENSIONS[barrierNumber - 1].barrierHeight;
    let randomLength = Math.random() * (area - width);
    let xBarrierPlace =
      this.xCoinPlaces[i] + this.coinCollectionWidth + randomLength;

    this.barriers.push(
      new Barrier(barrierNumber, width, height, xBarrierPlace)
    );
  }

  placePoison() {
    let lengthPoisonArea = 2 * mainWidth * (this.backgroundRepeat - 1);
    let placedPoisons = 0;

    while (placedPoisons < (this.backgroundRepeat - 1) * 2) {
      const poisonX = mainWidth + Math.random() * lengthPoisonArea;

      if (!this.isObjectInBarrier(poisonX, 190)) {
        this.poisons.push(new Poison(poisonX, this));
        placedPoisons++;
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjeckts);
    this.addToMap(this.sunlight);
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
      this.ctx.translate(centerX, centerY);
      this.ctx.scale(-1, 1);
      this.ctx.translate(-centerX, -centerY);
    }

    if (mo.rotate) {
      let angle = 0;
      switch(mo.rotate) {
        case 'up':
          angle = -25 * Math.PI / 180;
          break;
        case 'down':
          angle = 25 * Math.PI / 180;
          break;
      }
      this.ctx.translate(centerX, centerY);
      this.ctx.rotate(angle);
      this.ctx.translate(-centerX, -centerY);
    }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    this.ctx.restore();
  }

  setWorld() {
    this.character.world = this;
    this.sunlight.world = this;
    this.finalEnemy.world = this;
  }
}
