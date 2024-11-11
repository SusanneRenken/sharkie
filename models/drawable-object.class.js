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

  /**
   * Loads an image from the specified path and assigns it to the object.
   * @param {string} path - The path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads all images for an action and returns their paths.
   * @param {string} basePath - The base path for the images.
   * @param {string} action - The action type (e.g., 'swim', 'attack').
   * @param {number} count - The number of images to load.
   * @returns {string[]} An array of image paths.
   */
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

  /**
   * Generates an array of image paths.
   * @param {string} basePath - The base path for the images.
   * @param {string} action - The action type.
   * @param {string} [color=""] - The color variant of the image.
   * @param {number} count - The number of images to generate.
   * @returns {string[]} An array of generated image paths.
   */
  generateImagePaths(basePath, action, color = "", count) {
    const paths = [];
    for (let i = 1; i <= count; i++) {
      paths.push(`${basePath}/${action}/${color}${i}.png`);
    }
    return paths;
  }

  /**
   * Loads a list of images and caches them.
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      totalImages++;
      this.img = new Image();
      this.img.src = path;
      this.imageCache[path] = this.img;
      this.img.onload = function () {
        totalImagesLoaded++;
        updateCharacterPosition();
        if (totalImagesLoaded === totalImages) {
          allImagesLoaded();
        }
      };
    });
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
