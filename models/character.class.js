class Character extends MovableObject {
  width = 815 * mainScale;
  height = 1000 * mainScale;
  x = 0;
  y = mainHeight - this.height;  

  constructor(){
    super().loadImage('./img/sharkie/idle/1.png');
  }

  moveRight() {}

  turn() {}
}
