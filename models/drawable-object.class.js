class DrawableObject {
  width;
  height;
  x = 0;
  y = 0;
  offsetX = 0;
  offsetY = 0;
  offsetwidth = 0;
  offsetheight = 0;
  img;
  imageCache;
  currentImage;

  constructor() {
    this.currentImage = 0;
    this.imageCache = {};
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

  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
