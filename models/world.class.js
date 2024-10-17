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
    let xStartPlaces = [];

    this.getStartPlaces(xStartPlaces);
    this.generateCoins(xStartPlaces);    
  }

  getStartPlaces(xStartPlaces){
    let numberOfCoinCollection = (this.backgroundRepeat - 1) * 2;
    let minDistance = 1000 * mainScale;
    let lengthCoinArea =
      2 * mainWidth * (this.backgroundRepeat - 0.5) - minDistance;
    let newStart = mainWidth;
    let newXPlace = 0;
    
    for (let i = 0; i < numberOfCoinCollection; i++) {
      let areaLength =
        (lengthCoinArea - newStart) / (numberOfCoinCollection - i);
      let randomNumber = Math.random() * areaLength;
      newXPlace = Math.floor(newStart + randomNumber);
      xStartPlaces.push(newXPlace);
      newStart = newXPlace + minDistance;
    }
  }

  generateCoins(xStartPlaces){
    xStartPlaces.forEach((place) => {
      let xPlace = place;
      let yPlace = 0.1 * mainHeight + Math.random() * 0.7 * mainHeight;
      let coinForm = Math.random() < 0.5 ? 0 : 1;      
      let coinDirection = yPlace < 0.5 * mainHeight ? 1 : -1;

      if (coinForm) {
        this.placeCoinInLine(xPlace, yPlace, coinDirection);
      } else {
        this.placeCoinOnParabola(xPlace, yPlace, coinDirection);
      }
    });
  }

  placeCoinInLine(xPlace, yPlace, coinDirection) {
    let numberOfCoins = 2 + Math.floor(Math.random() * 4);

    for (let i = 0; i < numberOfCoins; i++) {
      this.coins.push(new Coin(xPlace, yPlace));
      xPlace += 60;
      yPlace += 50 * coinDirection;
    }
  }

  placeCoinOnParabola(xPlace, yPlace, coinDirection) {
    const coinPositions = [
      { x: 0, y: 0 },
      { x: 95, y: 155 },
      { x: 280, y: 235 },
      { x: 490, y: 235 },
      { x: 680, y: 155 },
      { x: 775, y: 0 },
    ];

    coinPositions.forEach((position) => {
      this.coins.push(
        new Coin(
          xPlace + position.x * mainScale,
          yPlace + position.y * mainScale * coinDirection
        )
      );
    });
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
