class MovableObject extends DrawableObject {
  objectLife;
  objectCoins;
  objectPoisons;
  backgroundRepeat;
  selectedColor;
  enemyAttack;
  enemyAttackForDeath;
  enemyAttackRepeat;
  enemyAttackSpeed;
  enemyAttackSound;
  enemyAttackDeadSound;
  speed;
  verticalSpeed;
  movementSpeed;
  otherDirection = false;
  animationRepeat;
  animationCount = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  animateMoving(arr) {
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    this.i = 0;
  }

  animateMovingOnce(arr) {
    if (this.currentImage < arr.length) {
      let path = arr[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      this.currentImage = 0;
    }
  }

  animateMovingReverse(arr) {
    let i = arr.length - 1 - (this.currentImage % arr.length);
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  isAnimationComplete(arr, propertyName) {
    if (this.currentImage % arr.length === 0) {
      this[propertyName] = false;
      this.currentImage = 0;
    }
  }

  countAnimationRepeat(arr) {
    if (this.currentImage % arr.length === 0) {
      this.animationCount++;
      this.currentImage = 0;
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
      this.x + this.offsetX + this.offsetwidth >= obj.x + obj.offsetX &&
      this.x + this.offsetX <= obj.x + obj.offsetX + obj.offsetwidth &&
      this.y + this.offsetY + this.offsetheight >= obj.y + obj.offsetY &&
      this.y + this.offsetY <= obj.y + obj.offsetY + obj.offsetheight
    );
  }

  
}
