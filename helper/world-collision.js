function collisionWithBarrier(world) {
  world.barrierHitboxes.forEach((barrier) => {
    if (world.character.isColliding(barrier)) {
      
      stopFinAttack(world.character, world)

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

function collisionWithBarrierSleeping(world) {
  world.barrierHitboxes.forEach((barrier) => {
    if (world.character.isColliding(barrier) && world.character.isSleeping) {
      world.character.isInBarrier = true;

      world.character.riseingY =
        barrier.y +
        barrier.offsetY -
        world.character.offsetY -
        world.character.offsetheight;
    }
  });
}

function collisionWithCoin(world) {
  world.coins.forEach((coin, i) => {
    if (world.character.isColliding(coin) && !world.character.isHit) {
      SOUND_COLLECT_COIN.currentTime = 0;
      SOUND_COLLECT_COIN.play();
      world.coins.splice(i, 1);
      collectedCoins++;
      coin.stopAllIntervals();
    }
  });
}

function collisionWithPoison(world) {
  world.poisons.forEach((poison, i) => {
    if (world.character.isColliding(poison) && !world.character.isHit) {
      SOUND_COLLECT_POISON.currentTime = 0;
      SOUND_COLLECT_POISON.play();
      world.poisons.splice(i, 1);
      collectedPoison++;
      poison.stopAllIntervals();
    }
  });
}

function collisionWithHearts(world) {
  world.hearts.forEach((heart, i) => {
    if (world.character.isColliding(heart) && !world.character.isHit) {
      SOUND_COLLECT_HEART.currentTime = 0;
      SOUND_COLLECT_HEART.play();
      world.hearts.splice(i, 1);
      characterLife++;
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
    handleCharacterBeingHit(character, enemy);
  }
  if (isPufferfish(character, enemy)) {
    enemy.isDying = true;
  }
}

function stopFinAttack(character, world) {
  world.isAttack = false;
  character.isAttackStart = false;
  getSwimParameter(character);
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
