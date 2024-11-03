function getParameter(obj) {
  obj.width = 815 * mainScale * 0.9;
  obj.height = 1000 * mainScale * 0.9;
  obj.x = 0;
  obj.y = -100;
}

function getSwimParameter(obj) {
  obj.offsetX = 160 * mainScale;
  obj.offsetY = 460 * mainScale;
  obj.offsetwidth = obj.width - 320 * mainScale;
  obj.offsetheight = obj.height - 680 * mainScale;
}

function getFinAttackParameter(obj) {
  obj.offsetX = 250 * mainScale;
  obj.offsetY = 460 * mainScale;
  obj.offsetwidth = obj.width - 320 * mainScale;
  obj.offsetheight = obj.height - 680 * mainScale;
}

function getSleepingParameter(obj) {
  obj.offsetX = 160 * mainScale;
  obj.offsetY = 560 * mainScale;
  obj.offsetwidth = obj.width - 320 * mainScale;
  obj.offsetheight = obj.height - 700 * mainScale;
}

function getObjectProperties(obj) {
  obj.objectLife = 3;
  obj.objectCoins = 0;
  obj.objectPoisons = 0;

  obj.speed = 5 + (obj.world.gameLevel - 1) / 2;

  obj.verticalSpeed = 0.5 * obj.speed;
  obj.movementSpeed = 180;
}

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

function setFinAttack(obj) {
  if (obj.world.keyboard.KEYD) {
    obj.attackType = obj.IMAGES_FIN;
    obj.attackSound = SOUND_CHARACTER_ATTACK;
    obj.startAttack = 5;
    getFinAttackParameter(obj);
    return true;
  }
  return false;
}

function setBubbleNormalAttack(obj) {
  if (obj.world.keyboard.KEYS) {
    obj.attackType = obj.IMAGES_BUB_N;
    obj.attackSound = SOUND_CHARACTER_BUB_N;
    obj.startAttack = 7;
    return true;
  }
  return false;
}

function setBubblePoisondAttack(obj) {
  if (obj.world.keyboard.KEYW) {
    obj.isPoisonAttack = true;
    if (obj.objectPoisons <= 0) {
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

function setBubbleAttack(obj) {
  if (
    obj.attackType != obj.IMAGES_FIN &&
    obj.currentImage === obj.startAttack
  ) {
    if (obj.attackType === obj.IMAGES_BUB_P) {
      obj.objectPoisons--;
      obj.isPoisonAttack = false;
      obj.world.generateBubble(2);
    } else if (!obj.isPoisonAttack) {
      obj.world.generateBubble(1);
    } else {
      obj.isPoisonAttack = false;
    }
  }
}

function playAttackSound(obj) {
  if (obj.currentImage === obj.startAttack) {
    obj.attackSound.currentTime = 0;
    obj.attackSound.play();
  }
}

function stopAttack(obj) {
  if (obj.currentImage >= obj.attackType.length) {
    obj.world.isAttack = false;
    obj.isAttackStart = false;
    obj.currentImage = 0;
    getSwimParameter(obj);
  }
}

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

function animateDeathAnimation(obj) {
  if (obj.currentImage === 0) {
    obj.enemyAttackDeadSound.play();
  }
  obj.animateMoving(obj[obj.enemyAttackForDeath]);
  if (obj.currentImage >= obj[obj.enemyAttackForDeath].length) {
    obj.isDead = true;
  }
}

function isFallAsleep(obj) {
  if (obj.isAwake) {
    // SOUND_CHARACTER_SLEEP.play();

    obj.animateMoving(obj.IMAGES_TRANS);
    if (obj.currentImage >= obj.IMAGES_TRANS.length) {
      obj.isAwake = false;
      obj.currentImage = 0;
    }
  }
}

function isSleepingDeeply(obj) {
  if (!obj.isAwake) {
    if (obj.y >= 290 * mainScale) {
      obj.y = 290 * mainScale;
    }
    getSleepingParameter(obj);
    obj.animateMoving(obj.IMAGES_SLEEP);
  }
}
