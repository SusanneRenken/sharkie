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

  drawFrame(ctx) {
    if (this instanceof Character) {
      if (!this.isSleeping && !this.isAttackStart) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 160 * mainScale,
          this.y + 460 * mainScale,
          this.width - 320 * mainScale,
          this.height - 680 * mainScale
        );
        ctx.stroke();
      }

      if (this.isAttackStart && this.attackType === this.IMAGES_FIN) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 200 * mainScale,
          this.y + 460 * mainScale,
          this.width - 320 * mainScale,
          this.height - 680 * mainScale
        );
        ctx.stroke();
      }

      if (this.isSleeping) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 160 * mainScale,
          this.y + 560 * mainScale,
          this.width - 320 * mainScale,
          this.height - 700 * mainScale
        );
        ctx.stroke();
      }
    }

    if (this instanceof Jellyfish) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "yellow";
      ctx.rect(
        this.x + 30 * mainScale,
        this.y + 50 * mainScale,
        this.width - 60 * mainScale,
        this.height - 100 * mainScale
      );
      ctx.stroke();
    }

    if (this instanceof Pufferfish) {
      if (!this.bubble) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "orange";
        ctx.rect(
          this.x + 20 * mainScale,
          this.y + 20 * mainScale,
          this.width - 60 * mainScale,
          this.height - 80 * mainScale
        );
        ctx.stroke();
      }

      if (this.bubble) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "orange";
        ctx.rect(
          this.x + 20 * mainScale,
          this.y + 20 * mainScale,
          this.width - 60 * mainScale,
          this.height - 40 * mainScale
        );
        ctx.stroke();
      }
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

    if (this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "purple";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }

    if (this instanceof Poison) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "purple";
      ctx.rect(
        this.x + 30 * mainScale,
        this.y + 50 * mainScale,
        this.width - 60 * mainScale,
        this.height - 70 * mainScale
      );
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