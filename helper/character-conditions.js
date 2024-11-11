/**
 * Checks if the object is alive and not currently attacking.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is alive and not attacking.
 */
function isAliveAndNotAttack(obj) {
  return !obj.isDead && !obj.world.isAttack;
}

/**
 * Checks if any key is pressed for movement or attack.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if an arrow key or attack key is pressed.
 */
function isKeyPressed(obj) {
  return isArrowkeyPressed(obj) || isAttackKeyPressed(obj);
}

/**
 * Checks if the object is sleeping.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is sleeping or not awake.
 */
function isSleeping(obj) {
  return obj.isSleeping || !obj.isAwake;
}

/**
 * Checks if any arrow key is pressed for movement.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if an arrow key is pressed.
 */
function isArrowkeyPressed(obj) {
  return (
    obj.world.keyboard.KEYD ||
    obj.world.keyboard.KEYA ||
    obj.world.keyboard.KEYW ||
    obj.world.keyboard.KEYWS
  );
}

/**
 * Checks if no attack keys are pressed.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if no attack keys are pressed.
 */
function areNoAttackKeysPressed(obj) {
  return (
    !obj.world.keyboard.KEYJ &&
    !obj.world.keyboard.KEYK &&
    !obj.world.keyboard.KEYL
  );
}

/**
 * Checks if any attack key is pressed.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if an attack key is pressed, false otherwise.
 */
function isAttackKeyPressed(obj) {
  if (!obj.world.isAttack) {
    if (setFinAttack(obj)) return true;
    if (setBubbleNormalAttack(obj)) return true;
    if (setBubblePoisondAttack(obj)) return true;
  }
}

/**
 * Checks if the object is alive and attacking.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is alive and attacking.
 */
function isAliveAndAttack(obj) {
  return !obj.isDead && obj.world.isAttack;
}

/**
 * Checks if the object is moving to the right.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is moving right and within world bounds.
 */
function isMovingRight(obj) {
  return obj.world.keyboard.KEYD && obj.x < obj.world.levelEndX;
}

/**
 * Checks if the object is moving to the left.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is moving left and within world bounds.
 */
function isMovingLeft(obj) {
  return obj.world.keyboard.KEYA && obj.x > 0;
}

/**
 * Checks if the object is moving upwards.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is moving up and within world bounds.
 */
function isMovingUp(obj) {
  return obj.world.keyboard.KEYW && obj.y > -400;
}

/**
 * Checks if the object is moving downwards.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is moving down and within world bounds.
 */
function isMovingDown(obj) {
  return obj.world.keyboard.KEYS && obj.y < 320;
}

/**
 * Checks if the object is performing the first move of a fin attack.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is in the first move of a fin attack.
 */
function isFinAttackFirstMove(obj) {
  return obj.currentImage <= 1 && obj.attackType === obj.IMAGES_FIN;
}

/**
 * Checks if the object is performing the second move of a fin attack.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is in the second move of a fin attack.
 */
function isFinAttackSecondMove(obj) {
  return obj.currentImage >= 7 && obj.attackType === obj.IMAGES_FIN;
}

/**
 * Checks if the object is dying from an attack.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is dying from an attack.
 */
function isDeathByAttack(obj) {
  return (
    obj.currentImage === obj[obj.enemyAttackForDeath].length &&
    obj.enemyAttackForDeath === "IMAGES_DEAD_A" &&
    obj.y > -obj.height
  );
}

/**
 * Checks if the object is dying from an electric attack.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is dying from an electric attack.
 */
function isDeathByElectric(obj) {
  return (
    obj.currentImage >= 8 &&
    obj.enemyAttackForDeath === "IMAGES_DEAD_E" &&
    obj.y < 180
  );
}

/**
 * Checks if the object is within the upper bounds of the world.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is moving up and within bounds.
 */
function isInWorldUp(obj) {
  return obj.world.keyboard.KEYW && obj.y > -400;
}

/**
 * Checks if the object is within the lower bounds of the world.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is moving down and within bounds.
 */
function isInWorldDown(obj) {
  return obj.world.keyboard.KEYS && obj.y < 370;
}
