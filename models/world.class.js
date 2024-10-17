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
  enemyName = this.level.enemies;
  enemies = [];
  coins = [];
  xStartPlaces = [];
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
    this.enemyName.forEach((EnemyClass) => {
      this.enemies.push(new EnemyClass(this.backgroundRepeat));
    });
  }

  placeCoins() {
    getStartPlaces(this.backgroundRepeat, this.xStartPlaces);
    generateCoins(this.xStartPlaces, this.coins);
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjeckts);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.sunlight);
    this.addObjectsToMap(this.coins);
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
