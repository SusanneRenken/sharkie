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
  deadIntervalId;
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


  animateMoving(arr) {
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  animateMovingReverse(arr) {
    let i = arr.length - 1 - (this.currentImage % arr.length);
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  countAnimationRepeat(arr) {
    if (this.currentImage % arr.length === 0) {
      this.animationCount++;
      this.currentImage = 0;
    }
  }

  stopAllIntervals() {
    if (this.animationIntervalId) {
      clearInterval(this.animationIntervalId);
      this.animationIntervalId = null;
    }
    if (this.deadIntervalId) {
      clearInterval(this.deadIntervalId);
      this.deadIntervalId = null;
    }
    if (this.movementIntervalId) {
      clearInterval(this.movementIntervalId);
      this.movementIntervalId = null;
    }
  }

  moveLeft(speed) {
    this.x -= speed;
  }

  moveRight(speed) {
    this.x += speed;
  }

  moveUp(speed) {
    this.y -= speed;
  }

  moveDown(speed) {
    this.y += speed;
  }

  isColliding(obj) {
    return (
      this.x + this.offsetX + this.offsetwidth  >= obj.x + obj.offsetX &&
      this.x + this.offsetX                     <= obj.x + obj.offsetX + obj.offsetwidth &&
      this.y + this.offsetY + this.offsetheight >= obj.y + obj.offsetY &&
      this.y + this.offsetY                     <= obj.y + obj.offsetY + obj.offsetheight
    );
  }

}
