class MovableObject {
  width;
  height;
  x = 0;
  y = 0;
  img;
  imageCache;
  currentImage;  
  selectedColor;
  speed;
  movementSpeed;
  otherDirection = false;

  constructor() {
    this.currentImage = 0;
    this.imageCache = {};
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadAllImages(basePath, action, count) {
    const images = this.generateImagePaths(
      basePath,
      action,
      this.selectedColor,
      count
    );
    this.loadImages(images);
    return images;
  }

  generateImagePaths(basePath, action, color = "", count) {
    const paths = [];
    for (let i = 1; i <= count; i++) {
      paths.push(`${basePath}/${action}/${color}${i}.png`);
    }
    return paths;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;
      this.imageCache[path] = this.img;
    });
  }

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

  animateMovingOnce(arr) {
    if (this.currentImage < arr.length) {
      let path = arr[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  moveLeft(speed) {
      this.x -= speed;
  }

  moveRight(speed) {
    this.x += speed;
}
}
