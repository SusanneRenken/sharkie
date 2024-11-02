const COIN_POSITIONS = [
  { x: 0, y: 0 },
  { x: 95, y: 155 },
  { x: 280, y: 235 },
  { x: 490, y: 235 },
  { x: 680, y: 155 },
  { x: 775, y: 0 },
];

const BARRIER_DIMENSIONS = [
  { barrierWidth: 1682 * mainScale, barrierHeight: 1080 * mainScale },
  { barrierWidth: 1415 * mainScale, barrierHeight: 649 * mainScale },
  { barrierWidth: 320 * mainScale, barrierHeight: 660 * mainScale },
];

function getStartPlacesCoins(world) {
  let numberOfCoinCollection = (world.backgroundRepeat - 1) * 2;
  let lengthCoinArea =
    2 * mainWidth * (world.backgroundRepeat - 0.5) - world.coinCollectionWidth;
  let newStart = mainWidth;
  let newXPlace = 0;

  for (let i = 0; i < numberOfCoinCollection; i++) {
    let areaLength = (lengthCoinArea - newStart) / (numberOfCoinCollection - i);
    let randomNumber = Math.random() * areaLength;
    newXPlace = Math.floor(newStart + randomNumber);
    world.xCoinPlaces.push(newXPlace);
    newStart = newXPlace + world.coinCollectionWidth;
  }
}

function generateCoins(world) {
  world.xCoinPlaces.forEach((place) => {
    let xPlace = place;
    let yPlace = 0.1 * mainHeight + Math.random() * 0.7 * mainHeight;
    let isCoinFormLine = Math.random() < 0.5 ? false : true;
    let coinDirection = yPlace < 0.5 * mainHeight ? 1 : -1;

    if (isCoinFormLine) {
      placeCoinInLine(xPlace, yPlace, coinDirection, world);
    } else {
      placeCoinOnParabola(xPlace, yPlace, coinDirection, world);
    }
  });
}

function placeCoinInLine(xPlace, yPlace, coinDirection, world) {
  let numberOfCoins = 2 + Math.floor(Math.random() * 4);

  for (let i = 0; i < numberOfCoins; i++) {
    world.coins.push(new Coin(xPlace, yPlace, world));
    xPlace += 120 * mainScale;
    yPlace += 95 * mainScale * coinDirection;
  }
}

function placeCoinOnParabola(xPlace, yPlace, coinDirection, world) {
  COIN_POSITIONS.forEach((position) => {
    world.coins.push(
      new Coin(
        xPlace + position.x * mainScale,
        yPlace + position.y * mainScale * coinDirection,
        world
      )
    );
  });
}

function getBarrierAreas(barrierAreas, world) {
  for (let i = 0; i < world.xCoinPlaces.length - 1; i++) {
    let areaWidth = Math.floor(
      world.xCoinPlaces[i + 1] -
        world.xCoinPlaces[i] -
        world.coinCollectionWidth
    );
    barrierAreas.push(areaWidth);
  }
}

function checkBarrierAreas(world, barrierAreas, isBarrierPlaced) {
  for (let i = 0; i < barrierAreas.length; i++) {
    const area = barrierAreas[i];
    for (let j = 0; j < 3; j++) {
      if (area > BARRIER_DIMENSIONS[j].barrierWidth && !isBarrierPlaced) {
        isBarrierPlaced = Math.random() < 0.7 ? true : false;
        if (isBarrierPlaced) {
          generateBarriers(world, j + 1, i, area);
        }
      }
    }
    isBarrierPlaced = false;
  }
}

function generateBarriers(world, barrierNumber, i, area) {
  let width = BARRIER_DIMENSIONS[barrierNumber - 1].barrierWidth;
  let height = BARRIER_DIMENSIONS[barrierNumber - 1].barrierHeight;
  let randomLength = Math.random() * (area - width);
  let xBarrierPlace =
    world.xCoinPlaces[i] + world.coinCollectionWidth + randomLength;

  world.barriers.push(new Barrier(barrierNumber, width, height, xBarrierPlace));
}

function isObjectInBarrier(objectX, objectWidth, barriers) {
  return barriers.some(
    (barrier) =>
      objectX >= barrier.x - 1.2 * objectWidth * mainScale &&
      objectX <= barrier.x + barrier.width + 0.2 * objectWidth * mainScale
  );
}

function collisionWithCoin(world) {
  world.coins.forEach((coin, i) => {
    if (world.character.isColliding(coin)) {
      SOUND_COLLECT_COIN.currentTime = 0;
      SOUND_COLLECT_COIN.play();
      world.coins.splice(i, 1);
      world.character.objectCoins++;
      coin.stopAllIntervals();
    }
  });
}

function collisionWithPoison(world) {
  world.poisons.forEach((poison, i) => {
    if (world.character.isColliding(poison)) {
      SOUND_COLLECT_POISON.currentTime = 0;
      SOUND_COLLECT_POISON.play();
      world.poisons.splice(i, 1);
      world.character.objectPoisons++;
      poison.stopAllIntervals();
    }
  });
}

function collisionWithEnemie(world) {
  world.enemies.forEach((enemy) => {
    if (world.character.isColliding(enemy)) {
      if (isFinAttack(world.character, world.isAttack)) {
        handleFinAttack(world.character, enemy, world);
      } else if (!world.isHit && !enemy.isDying) {
        handleCharacterBeingHit(world.character, enemy);
        world.isHit = true;
      }
    }
  });
}

function isFinAttack(character, isAttack) {
  return character.attackType === character.IMAGES_FIN && isAttack;
}

function handleFinAttack(character, enemy, world) {
  if (enemy instanceof Jellyfish && !enemy.isDying) {
    stopFinAttack(character, enemy, world);
  }
  if (isPufferfish(character, enemy)) {
    enemy.isDying = true;
  }
}

function stopFinAttack(character, enemy, world) {
  world.isAttack = false;
  character.isAttackStart = false;
  character.getSwimParameter();
  handleCharacterBeingHit(character, enemy);
}

function isPufferfish(character, enemy) {
  return (
    enemy instanceof Pufferfish &&
    !enemy.isDying &&
    character.currentImage === character.startAttack
  );
}

function collisionBubbleWithEnemie(world) {
  world.bubbles.forEach((bubble, bubbleIndex) => {
    world.enemies.forEach((enemy) => {
      if (bubble.isColliding(enemy) && !enemy.isDying) {
        SOUND_BUBBLE_BURST.play();
        world.bubbles.splice(bubbleIndex, 1);
        if (enemy instanceof Jellyfish && !enemy.isDying) {
          enemy.direction = bubble.direction;
          enemy.isDying = true;
        }
      }
    });
  });
}

function collisionWithEndboss(world) {
  if (
    world.character.isColliding(world.endBoss) &&
    !world.isHit &&
    !world.endBoss.isDead &&
    !world.endBoss.endBossIsHit
  ) {
    if (isAttackEndboss()) {
      world.endBoss.objectLife -= 0.5;
      world.endBoss.endBossIsHit = true;
    } else {
      handleCharacterBeingHit(world.character, world.endBoss);
      world.isHit = true;
    }
  }
}

function isAttackEndboss() {
  return (
    world.character.attackType === world.character.IMAGES_FIN && world.isAttack
  );
}

function collisionBubbleWithEndboss(world) {
  world.bubbles.forEach((bubble, bubbleIndex) => {
    if (world.endBoss.isColliding(bubble)) {
      SOUND_BUBBLE_BURST.play();
      world.bubbles.splice(bubbleIndex, 1);
      if (bubble.attackType === 2) {
        world.endBoss.objectLife -= 1;
        world.endBoss.endBossIsHit = true;
      }
    }
  });
}

function handleCharacterBeingHit(character, enemy) {
  character.enemyAttack = enemy.enemyAttack;
  character.enemyAttackForDeath = enemy.enemyAttackForDeath;
  character.enemyAttackRepeat = enemy.enemyAttackRepeat;
  character.enemyAttackSpeed = enemy.enemyAttackSpeed;
  character.enemyAttackSound = enemy.enemyAttackSound;
  character.enemyAttackDeadSound = enemy.enemyAttackDeadSound;
}
