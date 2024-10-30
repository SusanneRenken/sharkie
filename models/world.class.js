class World {
  level = getLevel1();
  gameLevel = 1;
  gameLevelFactor = Math.floor(this.gameLevel / 2 + 0.5);
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
  character = new Character(this);
  bubbles = [];
  isAttack = false;
  isHit = false;
  enemies = [];
  endBoss = new Endboss(this);
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
  statusBar = new StatusBar(this);
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
    getStartPlacesCoins(
      this.backgroundRepeat,
      this.xCoinPlaces,
      this.coinCollectionWidth
    );
    generateCoins(this.xCoinPlaces, this.coins, this);
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
    let numberOfEnemies = this.backgroundRepeat * (1 + this.gameLevelFactor);

    for (let i = 0; i < numberOfEnemies; i++) {
      let enemyClass = Math.random() < 0.5 ? Jellyfish : Pufferfish;

      if (enemyClass == Pufferfish) {
        this.enemies.push(new Pufferfish(this));
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

  checkCollisions() {
    setInterval(() => {
      this.collisionWithCoin();
      this.collisionWithPoison();
      this.collisionWithEnemie();
      this.collisionBubbleWithEnemie();
      this.collisionWithEndboss();
    }, 100);
  }

  collisionWithCoin() {
    this.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        SOUND_COLLECT_COIN.currentTime = 0;
        SOUND_COLLECT_COIN.play();
        this.coins.splice(i, 1);
        this.character.objectCoins++;
        coin.stopAllIntervals();
      }
    });
  }

  collisionWithPoison() {
    this.poisons.forEach((poison, i) => {
      if (this.character.isColliding(poison)) {
        SOUND_COLLECT_POISON.currentTime = 0;
        SOUND_COLLECT_POISON.play();
        this.poisons.splice(i, 1);
        this.character.objectPoisons++;
        poison.stopAllIntervals();
      }
    });
  }

  collisionWithEnemie() {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.isFinAttack()) {
          this.handleFinAttack(enemy);
        } else if (!this.isHit && !enemy.isDying) {
          this.handleCharacterBeingHit(enemy);
          this.isHit = true;
        }
      }
    });
  }

  isFinAttack() {
    return (
      this.character.attackType === this.character.IMAGES_FIN && this.isAttack
    );
  }

  handleFinAttack(enemy) {
    if (enemy instanceof Jellyfish) {
      this.stopFinAttack(enemy);
    }
    if (this.isPufferfish(enemy)) {
      enemy.isDying = true;
    }
  }

  stopFinAttack(enemy) {
    this.isAttack = false;
    this.character.isAttackStart = false;
    this.character.getSwimParameter();
    this.handleCharacterBeingHit(enemy);
  }

  isPufferfish(enemy) {
    return (
      enemy instanceof Pufferfish &&
      !enemy.isDying &&
      this.character.currentImage === this.character.startAttack
    );
  }

  collisionBubbleWithEnemie() {
    this.bubbles.forEach((bubble, bubbleIndex) => {
      this.enemies.forEach((enemy, enemyIndex) => {
        if (bubble.isColliding(enemy)) {
          SOUND_BUBBLE_BURST.play();
          this.bubbles.splice(bubbleIndex, 1);

          if (enemy instanceof Jellyfish && !enemy.isDying && bubble.attackType === 1) {
            enemy.isDying = true;
            console.log("Jetzt ist der Jelly tod!");
            
          }
        }
      });
    });
  }

  collisionWithEndboss() {
    if (
      this.character.isColliding(this.endBoss) &&
      !this.isHit &&
      !this.isAttack
    ) {
      this.handleCharacterBeingHit(this.endBoss);
      this.isHit = true;
    }
  }

  handleCharacterBeingHit(enemy) {
    this.character.enemyAttack = enemy.enemyAttack;
    this.character.enemyAttackForDeath = enemy.enemyAttackForDeath;
    this.character.enemyAttackRepeat = enemy.enemyAttackRepeat;
    this.character.enemyAttackSpeed = enemy.enemyAttackSpeed;
    this.character.enemyAttackSound = enemy.enemyAttackSound;
    this.character.enemyAttackDeadSound = enemy.enemyAttackDeadSound;
  }

  setAttack() {
    setInterval(() => {
      if (
        this.character.isAttackKeyPressed() &&
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
