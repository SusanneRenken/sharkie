class MovableObject extends DrawableObject {
  objectLife;
  backgroundRepeat;
  selectedColor;
  enemyNumber;
  enemyAttack;
  enemyAttackForDeath;
  enemyAttackRepeat;
  enemyAttackSpeed;
  enemyAttackSound;
  enemyAttackDeadSound;
  animationIntervalId;
  secondaryIntervalId;
  movementIntervalId;
  isHitStart = false;
  isDying;
  isDead = false;
  deadSound = false;
  speed;
  verticalSpeed;
  movementSpeed;
  otherDirection = false;
  animationRepeat;
  animationCount = 0;

  /**
   * Animates the movement of the object by cycling through an array of images.
   * @param {Array} arr - Array of image paths for the animation.
   */
  animateMoving(arr) {
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Animates the movement of the object in reverse order.
   * @param {Array} arr - Array of image paths for the animation.
   */
  animateMovingReverse(arr) {
    let i = arr.length - 1 - (this.currentImage % arr.length);
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Counts the number of times the animation sequence has been repeated.
   * @param {Array} arr - Array of image paths for the animation.
   */
  countAnimationRepeat(arr) {
    if (this.currentImage % arr.length === 0) {
      this.animationCount++;
      this.currentImage = 0;
    }
  }

  /**
   * Stops all active intervals for the object.
   */
  stopAllIntervals() {
    if (this.animationIntervalId) {
      clearInterval(this.animationIntervalId);
      this.animationIntervalId = null;
    }
    if (this.secondaryIntervalId) {
      clearInterval(this.secondaryIntervalId);
      this.secondaryIntervalId = null;
    }
    if (this.movementIntervalId) {
      clearInterval(this.movementIntervalId);
      this.movementIntervalId = null;
    }
  }

  /**
   * Moves the object to the left.
   * @param {number} speed - The speed at which to move the object.
   */
  moveLeft(speed) {
    this.x -= speed;
  }

  /**
   * Moves the object to the right.
   * @param {number} speed - The speed at which to move the object.
   */
  moveRight(speed) {
    this.x += speed;
  }

  /**
   * Moves the object upwards.
   * @param {number} speed - The speed at which to move the object.
   */
  moveUp(speed) {
    this.y -= speed;
  }

  /**
   * Moves the object downwards.
   * @param {number} speed - The speed at which to move the object.
   */
  moveDown(speed) {
    this.y += speed;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {Object} obj - The object to check for collision.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(obj) {
    return (
      this.x + this.offsetX + this.offsetwidth >= obj.x + obj.offsetX &&
      this.x + this.offsetX <= obj.x + obj.offsetX + obj.offsetwidth &&
      this.y + this.offsetY + this.offsetheight >= obj.y + obj.offsetY &&
      this.y + this.offsetY <= obj.y + obj.offsetY + obj.offsetheight
    );
  }
}
