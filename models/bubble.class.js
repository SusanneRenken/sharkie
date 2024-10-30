class Bubble extends MovableObject {
  width = 172 * mainScale;
  height = 172 * mainScale;
  selectedColor = "";
  IMAGES_BUBBLE;
  world;
  urX;
  urY;
  direction;
  startX;
  attackType;
  parabolaStarted = false;

  constructor(world, attackType) {
    super();
    this.world = world;
    this.attackType = attackType;

    this.loadImage(`./img/character/at_bub_b/${attackType}.png`);
    this.getParameter();

    this.animate();
    this.stopBubble();
  }

  getParameter(){
    this.direction = !this.world.character.otherDirection ? 1 : -1;
    this.startX = !this.world.character.otherDirection ? 600 : 0;
    this.x = this.world.character.x + this.startX * mainScale;
    this.y = this.world.character.y + 480 * mainScale;
    this.offsetwidth = this.width;
    this.offsetheight = this.height;
  }

  animate() {
    this.movementIntervalId = setInterval(() => {
      if (this.currentImage < 20) {
        this.x += 15 * this.direction;
        this.currentImage++;
      } else {
        if (!this.parabolaStarted) {
          this.urX = this.x;
          this.urY = this.y;
          this.parabolaStarted = true;
        }
        this.x += 15 * this.direction;
        const PARABOLA_WIDTH = 0.002;
        this.y = -(PARABOLA_WIDTH * Math.pow(this.x - this.urX, 2)) + this.urY;
      }      
    }, 1000 / 60);
  }

  stopBubble(){
    setTimeout(() => {
        this.world.bubbles = this.world.bubbles.filter((bubble) => bubble !== this);
        this.stopAllIntervals();
      }, 1000);
  }

}