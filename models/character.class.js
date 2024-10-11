class Character extends MovableObject {
  x = 100;
  y = 300;
  width = 163;
  height = 200;

  constructor(){
    super().loadImage('./img/1.Sharkie/1.IDLE/1.png');
  }

  moveRight() {}

  turn() {}
}
