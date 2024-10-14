class MovableObject {
  width;
  height;
  x = 0;
  y = 0;
  img;
  imageCache;
  currentImage;
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

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  generateImagePaths(basePath, action, color = "", count) {
    const paths = [];
    for (let i = 1; i <= count; i++) {
      paths.push(`${basePath}/${action}/${color}${i}.png`);
    }
    return paths;
  }

  animateMoving(arr) {
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveLeft(speed) {
    setInterval(() => {
      this.x -= speed;
    }, 1000 / 60);
  }
}
