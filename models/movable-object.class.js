class MovableObject {
  width;
  height;
  x = 0;
  y = 0;  
  img;

  loadImage(path){
    this.img = new Image();
    this.img.src = path;
  }

  moveLeft() {}

  moveUp() {}

  moveDown() {}
}
