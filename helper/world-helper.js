const COIN_POSITIONS = [
  { x: 0, y: 0 },
  { x: 95, y: 155 },
  { x: 280, y: 235 },
  { x: 490, y: 235 },
  { x: 680, y: 155 },
  { x: 775, y: 0 },
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

function getBarrierAreas(world) {
  for (let i = 0; i < world.xCoinPlaces.length - 1; i++) {
    let areaWidth = Math.floor(
      world.xCoinPlaces[i + 1] -
        world.xCoinPlaces[i] -
        world.coinCollectionWidth
    );
    world.barrierAreas.push(areaWidth);
  }
}

function checkBarrierAreas(world) {
  let isBarrierPlaced = false;

  const BARRIER_DIMENSIONS = [
    { barrierWidth: 1682 * mainScale, barrierHeight: 1080 * mainScale },
    { barrierWidth: 1415 * mainScale, barrierHeight: 649 * mainScale },
    { barrierWidth: 320 * mainScale, barrierHeight: 660 * mainScale },
  ];

  for (let i = 0; i < world.barrierAreas.length; i++) {
    const area = world.barrierAreas[i];
    for (let j = 0; j < 3; j++) {
      if (area > BARRIER_DIMENSIONS[j].barrierWidth && !isBarrierPlaced) {
        isBarrierPlaced = Math.random() < 0.7 ? true : false;
        if (isBarrierPlaced) {
          generateBarriers(world, j + 1, i, area, BARRIER_DIMENSIONS);
        }
      }
    }
    isBarrierPlaced = false;
  }
}

function generateBarriers(world, barrierNumber, i, area, BARRIER_DIMENSIONS) {
  let width = BARRIER_DIMENSIONS[barrierNumber - 1].barrierWidth;
  let height = BARRIER_DIMENSIONS[barrierNumber - 1].barrierHeight;
  let randomLength = Math.random() * (area - width);
  let xBarrierPlace =
    world.xCoinPlaces[i] + world.coinCollectionWidth + randomLength;

  world.barriers.push(
    new Barrier(barrierNumber, width, height, xBarrierPlace, world)
  );
}

function isObjectInBarrier(objectX, objectWidth, barriers) {
  return barriers.some(
    (barrier) =>
      objectX >= barrier.x - 1.2 * objectWidth * mainScale &&
      objectX <= barrier.x + barrier.width + 0.2 * objectWidth * mainScale
  );
}






function collisionWithBarrier(world) {
  world.barrierHitboxes.forEach((barrier) => {
    if (world.character.isColliding(barrier)) {

      if (isCollidingFromLeft(world, barrier)) {
        stopMovingRight(world, barrier);
      } else if (isCollidingFromRight(world, barrier)) {
        stopMovingLeft(world, barrier);
      }

      if (isCollidingFromAbove(world, barrier)) {
        stopMovingDownwards(world, barrier);
      } else if (isCollidingFromBelow(world, barrier)) {
        stopMovingUpwards(world, barrier);
      }
    }
  });
}

function isCollidingFromLeft(world, barrier) {
  return (
    world.character.lastX +
      world.character.offsetX +
      world.character.offsetwidth <=
    barrier.x + barrier.offsetX
  );
}

function stopMovingRight(world, barrier) {
  world.character.x =
    barrier.x +
    barrier.offsetX -
    world.character.offsetwidth -
    world.character.offsetX;
}

function isCollidingFromRight(world, barrier) {
  return (
    world.character.lastX + world.character.offsetX >=
    barrier.x + barrier.offsetX + barrier.offsetwidth
  );
}

function stopMovingLeft(world, barrier) {
  world.character.x =
    barrier.x + barrier.offsetX + barrier.offsetwidth - world.character.offsetX;
}

function isCollidingFromAbove(world, barrier) {
  return (
    world.character.lastY +
      world.character.offsetY +
      world.character.offsetheight <=
    barrier.y + barrier.offsetY
  );
}

function stopMovingDownwards(world, barrier) {
  world.character.y =
    barrier.y +
    barrier.offsetY -
    world.character.offsetheight -
    world.character.offsetY;
}

function isCollidingFromBelow(world, barrier) {
  return (
    world.character.lastY + world.character.offsetY >=
    barrier.y + barrier.offsetY + barrier.offsetheight
  );
}

function stopMovingUpwards(world, barrier) {
  world.character.y =
    barrier.y +
    barrier.offsetY +
    barrier.offsetheight -
    world.character.offsetY;
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
  getSwimParameter(character);
  handleCharacterBeingHit(character, enemy);
}

function isPufferfish(character, enemy) {
  return (
    enemy instanceof Pufferfish &&
    !enemy.isDying &&
    character.currentImage === character.startAttack
  );
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

function collisionBubbleWithBarrier(world) {
  world.bubbles.forEach((bubble, bubbleIndex) => {
    world.barrierHitboxes.forEach((barrier) => {
      if (bubble.isColliding(barrier)) {
        SOUND_BUBBLE_BURST.play();
        world.bubbles.splice(bubbleIndex, 1);
      }
    });
  });
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
