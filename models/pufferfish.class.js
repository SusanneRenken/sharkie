class Pufferfish extends MovableObject {
  COLOR = ["green", "orange", "red"];
  IMAGES_SWIM;
  IMAGES_TRANSITION;
  IMAGES_BUBBLESWIM;
  backgroundRepeat;

  constructor(backgroundRepeat) {
    super();
    this.backgroundRepeat = backgroundRepeat;

    this.getRandomColor();
    this.getParameter();
    this.getImages();

    this.enemyAttack = "IMAGES_HIT_P";
    this.enemyAttackSound = SOUND_CHARACTER_HIT_P;
    this.animationRepeat = Math.floor(3 + Math.random() * 4);
    this.speed = 0.3 + Math.random() * 0.6;
    this.movementSpeed = 100 + this.speed * 30;

    this.animate();
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.COLOR.length);
    this.selectedColor = this.COLOR[randomIndex];
  }

  getParameter() {
    this.width = 241 * mainScale;
    this.height = 198 * mainScale;

    this.x =
      mainWidth +
      Math.random() * (2 * mainWidth * (this.backgroundRepeat - 1.2));
    this.y = Math.random() * (mainHeight - this.height);

    this.offsetX = 0;
    this.offsetY = 0;
    this.offsetwidth = this.width - 20 * mainScale;
    this.offsetheight = this.height;
  }

  getImages() {
    this.IMAGES_SWIM = this.loadAllImages("./img/enemy/pufferfish", "swim", 5);
    this.IMAGES_TRANSITION = this.loadAllImages(
      "./img/enemy/pufferfish",
      "transition",
      5
    );
    this.IMAGES_BUBBLESWIM = this.loadAllImages(
      "./img/enemy/pufferfish",
      "bubbleswim",
      5
    );
  }

  animate() {
    setInterval(() => {
      if (this.animationCount < this.animationRepeat) {
        this.animateMoving(this.IMAGES_SWIM);
        this.countAnimationRepeat(this.IMAGES_SWIM);
      } else if (this.animationCount === this.animationRepeat) {
        this.animateMoving(this.IMAGES_TRANSITION);
        this.isAnimateTransition(true);
      } else if (
        this.animationCount > this.animationRepeat &&
        this.animationCount < 2 * this.animationRepeat + 1
      ) {
        this.animateMoving(this.IMAGES_BUBBLESWIM);
        this.countAnimationRepeat(this.IMAGES_BUBBLESWIM);
      } else if (this.animationCount === 2 * this.animationRepeat + 1) {
        this.animateMovingReverse(this.IMAGES_TRANSITION);
        this.isAnimateTransition(false);
      }
    }, this.movementSpeed);

    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  isAnimateTransition(countUp) {
    if (this.currentImage >= this.IMAGES_TRANSITION.length) {
      if (countUp) {
        this.animationCount++;
      } else {
        this.animationCount = 0;
      }
      this.currentImage = 0;
    }
  }
}
