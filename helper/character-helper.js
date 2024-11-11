/**
 * Sets the basic parameters for the object, including width, height, and position.
 * @param {Object} obj - The object to set parameters for.
 */
function getParameter(obj) {
  obj.width = 815 * 0.9;
  obj.height = 1000 * 0.9;
  obj.x = 0;
  obj.y = -100;
}

/**
 * Sets the swimming parameters for the object, including offsets for collision detection.
 * @param {Object} obj - The object to set parameters for.
 */
function getSwimParameter(obj) {
  obj.offsetX = 160;
  obj.offsetY = 460;
  obj.offsetwidth = obj.width - 320;
  obj.offsetheight = obj.height - 680;
}

/**
 * Sets the parameters for the fin attack, including offsets for collision detection.
 * @param {Object} obj - The object to set parameters for.
 */
function getFinAttackParameter(obj) {
  obj.offsetX = 250;
  obj.offsetY = 460;
  obj.offsetwidth = obj.width - 320;
  obj.offsetheight = obj.height - 680;
}

/**
 * Sets the parameters for when the object is sleeping, including offsets for collision detection.
 * @param {Object} obj - The object to set parameters for.
 */
function getSleepingParameter(obj) {
  obj.offsetX = 160;
  obj.offsetY = 560;
  obj.offsetwidth = obj.width - 320;
  obj.offsetheight = obj.height - 700;
}

/**
 * Sets the movement properties for the object, including speed and vertical speed.
 * @param {Object} obj - The object to set properties for.
 */
function getObjectProperties(obj) {
  obj.speed = 9 + obj.world.currentLevel;
  obj.verticalSpeed = 0.5 * obj.speed;
  obj.movementSpeed = 180;
}

/**
 * Loads images for different animations of the character.
 * @param {Object} obj - The object to set image properties for.
 */
function getImages(obj) {
  obj.IMAGES_SWIM = obj.loadAllImages("./img/character", "swim", 6);
  obj.IMAGES_TRANS = obj.loadAllImages("./img/character", "transition", 10);
  obj.IMAGES_SLEEP = obj.loadAllImages("./img/character", "sleep", 4);
  obj.IMAGES_FIN = obj.loadAllImages("./img/character", "at_fin-slap", 8);
  obj.IMAGES_BUB_N = obj.loadAllImages("./img/character", "at_bub_n", 8);
  obj.IMAGES_BUB_P = obj.loadAllImages("./img/character", "at_bub_p", 8);
  obj.IMAGES_HIT_A = obj.loadAllImages("./img/character", "hit_a", 2);
  obj.IMAGES_HIT_E = obj.loadAllImages("./img/character", "hit_e", 3);
  obj.IMAGES_HIT_P = obj.loadAllImages("./img/character", "hit_p", 4);
  obj.IMAGES_DEAD_A = obj.loadAllImages("./img/character", "dead_a", 11);
  obj.IMAGES_DEAD_E = obj.loadAllImages("./img/character", "dead_e", 10);
  obj.IMAGES_IDLE = obj.loadAllImages("./img/character", "idle", 18);
}

/**
 * Sets the parameters for a fin attack and checks if the corresponding key is pressed.
 * @param {Object} obj - The object to set attack parameters for.
 * @returns {boolean} - True if the fin attack key is pressed, false otherwise.
 */
function setFinAttack(obj) {
  if (obj.world.keyboard.KEYL) {
    obj.attackType = obj.IMAGES_FIN;
    obj.attackSound = SOUND_CHARACTER_ATTACK;
    obj.startAttack = 5;
    getFinAttackParameter(obj);
    return true;
  }
  return false;
}

/**
 * Sets the parameters for a normal bubble attack and checks if the corresponding key is pressed.
 * @param {Object} obj - The object to set attack parameters for.
 * @returns {boolean} - True if the normal bubble attack key is pressed, false otherwise.
 */
function setBubbleNormalAttack(obj) {
  if (obj.world.keyboard.KEYK) {
    obj.attackType = obj.IMAGES_BUB_N;
    obj.attackSound = SOUND_CHARACTER_BUB_N;
    obj.startAttack = 7;
    return true;
  }
  return false;
}

/**
 * Sets the parameters for a poisoned bubble attack and checks if the corresponding key is pressed.
 * @param {Object} obj - The object to set attack parameters for.
 * @returns {boolean} - True if the poisoned bubble attack key is pressed, false otherwise.
 */
function setBubblePoisondAttack(obj) {
  if (obj.world.keyboard.KEYJ) {
    obj.isPoisonAttack = true;
    if (collectedPoison <= 0) {
      obj.attackType = obj.IMAGES_BUB_N;
      obj.attackSound = SOUND_BUBBLE_BURST;
      obj.startAttack = 7;
    } else {
      obj.attackType = obj.IMAGES_BUB_P;
      obj.attackSound = SOUND_CHARACTER_BUB_P;
      obj.startAttack = 7;
    }
    return true;
  }
  return false;
}

/**
 * Handles the execution of the bubble attack and checks if the attack type is not a fin attack.
 * @param {Object} obj - The object to execute the bubble attack for.
 */
function setBubbleAttack(obj) {
  if (
    obj.attackType != obj.IMAGES_FIN &&
    obj.currentImage === obj.startAttack
  ) {
    if (obj.attackType === obj.IMAGES_BUB_P) {
      collectedPoison--;
      obj.isPoisonAttack = false;
      obj.world.generateBubble(2);
    } else if (!obj.isPoisonAttack) {
      obj.world.generateBubble(1);
    } else {
      obj.isPoisonAttack = false;
    }
  }
}

/**
 * Plays the attack sound when the character reaches the start of the attack.
 * @param {Object} obj - The object to play the attack sound for.
 */
function playAttackSound(obj) {
  if (obj.currentImage === obj.startAttack) {
    obj.attackSound.currentTime = 0;
    obj.attackSound.play();
  }
}

/**
 * Stops the current attack and resets parameters.
 * @param {Object} obj - The object to stop the attack for.
 */
function stopAttack(obj) {
  if (obj.currentImage >= obj.attackType.length) {
    obj.world.isAttack = false;
    obj.isAttackStart = false;
    obj.currentImage = 0;
    getSwimParameter(obj);
  }
}

/**
 * Animates the hit animation for the character.
 * @param {Object} obj - The object to animate the hit animation for.
 */
function animateHitAnimation(obj) {
  if (obj.animationCount < obj.animationRepeat) {
    obj.enemyAttackSound.play();
    obj.animateMoving(obj[obj.enemyAttack]);
    obj.countAnimationRepeat(obj[obj.enemyAttack]);
  } else if (obj.animationCount === obj.animationRepeat) {
    obj.isHitStart = false;
    obj.world.isHit = false;
    obj.animationCount = 0;
  }
}

/**
 * Animates the death animation for the character.
 * @param {Object} obj - The object to animate the death animation for.
 */
function animateDeathAnimation(obj) {
  if (obj.currentImage === 0) {
    obj.enemyAttackDeadSound.play();
  }
  obj.animateMoving(obj[obj.enemyAttackForDeath]);
  if (obj.currentImage >= obj[obj.enemyAttackForDeath].length) {
    obj.isDead = true;
    setTimeout(() => {
      gameOver();
    }, 2000);
  }
}

/**
 * Animates the transition to falling asleep.
 * @param {Object} obj - The object to animate the transition for.
 */
function isFallAsleep(obj) {
  if (obj.isAwake) {
    obj.animateMoving(obj.IMAGES_TRANS);
    if (obj.currentImage >= obj.IMAGES_TRANS.length) {
      obj.isAwake = false;
      obj.currentImage = 0;
    }
  }
}

/**
 * Animates the character sleeping deeply.
 * @param {Object} obj - The object to animate sleeping for.
 */
function isSleepingDeeply(obj) {
  if (!obj.isAwake) {
    if (obj.y >= 290) {
      obj.y = 290;
    }
    handleSleepingOnBarrier(obj);

    SOUND_CHARACTER_SLEEP.play();
    getSleepingParameter(obj);
    obj.animateMoving(obj.IMAGES_SLEEP);
  }
}

/**
 * Handles the character sleeping on a barrier.
 * @param {Object} obj - The object to handle sleeping on a barrier for.
 */
function handleSleepingOnBarrier(obj) {
  if (obj.isInBarrier && !obj.isSleepingOnBarrier) {
    obj.isSleepingOnBarrier = true;
    obj.y = obj.riseingY;
  }

  if (obj.isSleepingOnBarrier) {
    obj.y = obj.riseingY;
  }
}
