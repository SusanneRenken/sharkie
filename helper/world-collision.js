/**
 * Handles collisions between the character and barriers in the world.
 * @param {Object} world - The game world containing barriers and the character.
 */
function collisionWithBarrier(world) {
  world.barrierHitboxes.forEach((barrier) => {
    if (world.character.isColliding(barrier)) {
      stopFinAttack(world.character, world);

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

/**
 * Checks if the character is colliding with a barrier from the left.
 * @param {Object} world - The game world containing the character.
 * @param {Object} barrier - The barrier to check collision with.
 * @returns {boolean} - True if the character is colliding from the left.
 */
function isCollidingFromLeft(world, barrier) {
  return (
    world.character.lastX +
      world.character.offsetX +
      world.character.offsetwidth <=
    barrier.x + barrier.offsetX
  );
}

/**
 * Stops the character from moving right when colliding with a barrier from the left.
 * @param {Object} world - The game world containing the character.
 * @param {Object} barrier - The barrier that the character is colliding with.
 */
function stopMovingRight(world, barrier) {
  world.character.x =
    barrier.x +
    barrier.offsetX -
    world.character.offsetwidth -
    world.character.offsetX;
}

/**
 * Checks if the character is colliding with a barrier from the right.
 * @param {Object} world - The game world containing the character.
 * @param {Object} barrier - The barrier to check collision with.
 * @returns {boolean} - True if the character is colliding from the right.
 */
function isCollidingFromRight(world, barrier) {
  return (
    world.character.lastX + world.character.offsetX >=
    barrier.x + barrier.offsetX + barrier.offsetwidth
  );
}

/**
 * Stops the character from moving left when colliding with a barrier from the right.
 * @param {Object} world - The game world containing the character.
 * @param {Object} barrier - The barrier that the character is colliding with.
 */
function stopMovingLeft(world, barrier) {
  world.character.x =
    barrier.x + barrier.offsetX + barrier.offsetwidth - world.character.offsetX;
}

/**
 * Checks if the character is colliding with a barrier from above.
 * @param {Object} world - The game world containing the character.
 * @param {Object} barrier - The barrier to check collision with.
 * @returns {boolean} - True if the character is colliding from above.
 */
function isCollidingFromAbove(world, barrier) {
  return (
    world.character.lastY +
      world.character.offsetY +
      world.character.offsetheight <=
    barrier.y + barrier.offsetY
  );
}

/**
 * Stops the character from moving downwards when colliding with a barrier from above.
 * @param {Object} world - The game world containing the character.
 * @param {Object} barrier - The barrier that the character is colliding with.
 */
function stopMovingDownwards(world, barrier) {
  world.character.y =
    barrier.y +
    barrier.offsetY -
    world.character.offsetheight -
    world.character.offsetY;
}

/**
 * Checks if the character is colliding with a barrier from below.
 * @param {Object} world - The game world containing the character.
 * @param {Object} barrier - The barrier to check collision with.
 * @returns {boolean} - True if the character is colliding from below.
 */
function isCollidingFromBelow(world, barrier) {
  return (
    world.character.lastY + world.character.offsetY >=
    barrier.y + barrier.offsetY + barrier.offsetheight
  );
}

/**
 * Stops the character from moving upwards when colliding with a barrier from below.
 * @param {Object} world - The game world containing the character.
 * @param {Object} barrier - The barrier that the character is colliding with.
 */
function stopMovingUpwards(world, barrier) {
  world.character.y =
    barrier.y +
    barrier.offsetY +
    barrier.offsetheight -
    world.character.offsetY;
}

/**
 * Handles collisions between the character and barriers when the character is sleeping.
 * @param {Object} world - The game world containing barriers and the character.
 */
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

/**
 * Handles collisions between the character and coins in the world.
 * @param {Object} world - The game world containing coins and the character.
 */
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

/**
 * Handles collisions between the character and poisons in the world.
 * @param {Object} world - The game world containing poisons and the character.
 */
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

/**
 * Handles collisions between the character and hearts in the world.
 * @param {Object} world - The game world containing hearts and the character.
 */
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

/**
 * Handles collisions between the character and enemies in the world.
 * @param {Object} world - The game world containing enemies and the character.
 */
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

/**
 * Checks if the character is performing a fin attack.
 * @param {Object} character - The character in the world.
 * @param {boolean} isAttack - Whether the character is currently attacking.
 * @returns {boolean} - True if the character is performing a fin attack.
 */
function isFinAttack(character, isAttack) {
  return character.attackType === character.IMAGES_FIN && isAttack;
}

/**
 * Handles the character's fin attack when colliding with an enemy.
 * @param {Object} character - The character in the world.
 * @param {Object} enemy - The enemy that the character is colliding with.
 * @param {Object} world - The game world containing the enemy and the character.
 */
function handleFinAttack(character, enemy, world) {
  if (enemy instanceof Jellyfish && !enemy.isDying) {
    stopFinAttack(character, enemy, world);
    handleCharacterBeingHit(character, enemy);
  }
  if (isPufferfish(character, enemy)) {
    enemy.isDying = true;
  }
}

/**
 * Stops the character's fin attack.
 * @param {Object} character - The character in the world.
 * @param {Object} world - The game world containing the character.
 */
function stopFinAttack(character, world) {
  world.isAttack = false;
  character.isAttackStart = false;
  getSwimParameter(character);
}

/**
 * Checks if the enemy is a pufferfish.
 * @param {Object} character - The character in the world.
 * @param {Object} enemy - The enemy that the character is colliding with.
 * @returns {boolean} - True if the enemy is a pufferfish and the character is attacking.
 */
function isPufferfish(character, enemy) {
  return (
    enemy instanceof Pufferfish &&
    !enemy.isDying &&
    character.currentImage === character.startAttack
  );
}

/**
 * Handles collisions between the character and the end boss in the world.
 * @param {Object} world - The game world containing the end boss and the character.
 */
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

/**
 * Checks if the character is attacking the end boss.
 * @returns {boolean} - True if the character is attacking the end boss.
 */
function isAttackEndboss() {
  return (
    world.character.attackType === world.character.IMAGES_FIN && world.isAttack
  );
}

/**
 * Handles collisions between bubbles and enemies in the world.
 * @param {Object} world - The game world containing bubbles and enemies.
 */
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

/**
 * Handles collisions between bubbles and barriers in the world.
 * @param {Object} world - The game world containing bubbles and barriers.
 */
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

/**
 * Handles collisions between bubbles and the end boss in the world.
 * @param {Object} world - The game world containing bubbles and the end boss.
 */
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

/**
 * Handles the character being hit by an enemy.
 * @param {Object} character - The character in the world.
 * @param {Object} enemy - The enemy that hits the character.
 */
function handleCharacterBeingHit(character, enemy) {
  character.enemyAttack = enemy.enemyAttack;
  character.enemyAttackForDeath = enemy.enemyAttackForDeath;
  character.enemyAttackRepeat = enemy.enemyAttackRepeat;
  character.enemyAttackSpeed = enemy.enemyAttackSpeed;
  character.enemyAttackSound = enemy.enemyAttackSound;
  character.enemyAttackDeadSound = enemy.enemyAttackDeadSound;
}
