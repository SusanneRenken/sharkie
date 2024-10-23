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
  verticalSpeed;
  movementSpeed;
  otherDirection = false;
  animationRepeat;
  animationCount = 0;
  

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

  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character) {
      if (!this.isSleeping) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 140 * mainScale,
          this.y + 410 * mainScale,
          this.width - 280 * mainScale,
          this.height - 610 * mainScale
        );
        ctx.stroke();
      }

      if (this.isSleeping) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 140 * mainScale,
          this.y + 540 * mainScale,
          this.width - 280 * mainScale,
          this.height - 640 * mainScale
        );
        ctx.stroke();
      }
    }

    if (this instanceof Jellyfish) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "yellow";
      ctx.rect(
        this.x,
        this.y + 10 * mainScale,
        this.width,
        this.height - 40 * mainScale
      );
      ctx.stroke();
    }

    if (this instanceof Pufferfish) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "orange";
      ctx.rect(this.x, this.y, this.width - 20 * mainScale, this.height);
      ctx.stroke();
    }

    if (this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "orange";
      ctx.rect(
        this.x + 50 * mainScale,
        this.y + 575 * mainScale,
        this.width - 100 * mainScale,
        this.height - 800 * mainScale
      );
      ctx.stroke();
    }

    if (this instanceof Coin || this instanceof Poison) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "purple";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }

    if (this instanceof Barrier) {
      if (this.barrierNumber === 1) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 20 * mainScale,
          this.y,
          this.width - 600 * mainScale,
          this.height - 780 * mainScale
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 1150 * mainScale,
          this.y,
          this.width - 1500 * mainScale,
          this.height - 680 * mainScale
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 1350 * mainScale,
          this.y,
          this.width - 1380 * mainScale,
          this.height - 760 * mainScale
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x,
          this.y + 930 * mainScale,
          this.width - 1600 * mainScale,
          this.height - 930 * mainScale
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 130 * mainScale,
          this.y + 850 * mainScale,
          this.width - 190 * mainScale,
          this.height - 850 * mainScale
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 550 * mainScale,
          this.y + 800 * mainScale,
          this.width - 800 * mainScale,
          this.height - 1040 * mainScale
        );
        ctx.stroke();
      }
      if (this.barrierNumber === 2) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 50 * mainScale,
          this.y + 330 * mainScale,
          this.width - 1180 * mainScale,
          this.height - 330 * mainScale
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 290 * mainScale,
          this.y + 120 * mainScale,
          this.width - 1100 * mainScale,
          this.height - 120 * mainScale
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 610 * mainScale,
          this.y + 20 * mainScale,
          this.width - 860 * mainScale,
          this.height - 20 * mainScale
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 1170 * mainScale,
          this.y + 260 * mainScale,
          this.width - 1210 * mainScale,
          this.height - 260 * mainScale
        );
        ctx.stroke();
      }
      if (this.barrierNumber === 3) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 30 * mainScale,
          this.y,
          this.width - 50 * mainScale,
          this.height
        );
        ctx.stroke();
      }
    }
  }
}
