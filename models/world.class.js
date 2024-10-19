class World {
  level = getLevel1();
  pathBackgroundObjeckts = this.level.backgroundObjects;
  backgroundObjeckts = [];
  backgroundRepeat = this.level.backgroundRepeat;
  level_end_x;
  sunlight = new Sunlight(
    this.level.sunlight,
    this.level.characterSpeed,
    this.backgroundRepeat
  );
  character = new Character(this.level.characterSpeed);
  enemies = [];
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
    this.level_end_x = this.backgroundRepeat * 2 * mainWidth - mainWidth;
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
      this.enemies.push(new enemyClass(this.backgroundRepeat));
    }
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
      { barrierWidth: 365 * mainScale, barrierHeight: 750 * mainScale },
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
    let poisonInBarrier = false;
    let placedPoisons = 0;

    while (placedPoisons < 6) {
      const poisonX = mainWidth + Math.random() * lengthPoisonArea;

      if (!this.isPoisonInBarrier(poisonX)) {
        this.poisons.push(new Poison(poisonX));
        placedPoisons++;
      }
    }
  }

  isPoisonInBarrier(poisonX) {
    return this.barriers.some(
      (barrier) =>
        poisonX >= barrier.x - 2 * 179 * mainScale &&
        poisonX <= barrier.x + barrier.width + 179 * mainScale
    );
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
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  setWorld() {
    this.character.world = this;
    this.sunlight.world = this;
  }
}
