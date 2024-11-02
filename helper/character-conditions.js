function isAliveAndNotAttack(obj) {
  return !obj.isDead && !obj.world.isAttack;
}

function isKeyPressed(obj) {
  return isArrowkeyPressed(obj) || isAttackKeyPressed(obj);
}

function isSleeping(obj) {
  return obj.isSleeping && !obj.isAwake;
}

function isArrowkeyPressed(obj) {
  return (
    obj.world.keyboard.ARROWRIGHT ||
    obj.world.keyboard.ARROWLEFT ||
    obj.world.keyboard.ARROWUP ||
    obj.world.keyboard.ARROWDOWN
  );
}

function isAttackKeyPressed(obj) {
  if (!obj.world.isAttack) {
    if (setFinAttack(obj)) return true;
    if (setBubbleNormalAttack(obj)) return true;
    if (setBubblePoisondAttack(obj)) return true;
  }
}

function isAliveAndAttack(obj) {
  return !obj.isDead && obj.world.isAttack;
}

function isMovingRight(obj) {
  return obj.world.keyboard.ARROWRIGHT && obj.x < obj.world.levelEndX;
}

function isMovingLeft(obj) {
  return obj.world.keyboard.ARROWLEFT && obj.x > 0;
}

function isMovingUp(obj) {
  return obj.world.keyboard.ARROWUP && obj.y > -400 * mainScale;
}

function isMovingDown(obj) {
  return obj.world.keyboard.ARROWDOWN && obj.y < 320 * mainScale;
}

function isFinAttackFirstMove(obj) {
  return obj.currentImage <= 1 && obj.attackType === obj.IMAGES_FIN;
}

function isFinAttackSecondMove(obj) {
  return obj.currentImage >= 7 && obj.attackType === obj.IMAGES_FIN;
}

function isDeathByAttack(obj) {
  return (
    obj.currentImage === obj[obj.enemyAttackForDeath].length &&
    obj.enemyAttackForDeath === "IMAGES_DEAD_A" &&
    obj.y > -obj.height
  );
}

function isDeathByElectric(obj) {
  return (
    obj.currentImage === 8 &&
    obj.enemyAttackForDeath === "IMAGES_DEAD_E" &&
    obj.y < 200 * mainScale
  );
}

function isInWorldUp(obj){
    return obj.world.keyboard.ARROWUP && obj.y > -400 * mainScale
}

function isInWorldDown(obj){
    return obj.world.keyboard.ARROWDOWN && obj.y < 370 * mainScale
}
