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

  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character) {
      if (this.isAwake && !this.isAttackStart) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 160,
          this.y + 460,
          this.width - 320,
          this.height - 680
        );
        ctx.stroke();
      }

      if (this.isAttackStart && this.attackType === this.IMAGES_FIN) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 250,
          this.y + 460,
          this.width - 320,
          this.height - 680
        );
        ctx.stroke();
      }

      if (!this.isAwake) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 160,
          this.y + 560,
          this.width - 320,
          this.height - 700
        );
        ctx.stroke();
      }
    }

    if (this instanceof Jellyfish) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "yellow";
      ctx.rect(this.x + 30, this.y + 50, this.width - 60, this.height - 100);
      ctx.stroke();
    }

    if (this instanceof Pufferfish) {
      if (!this.bubble) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "orange";
        ctx.rect(this.x + 20, this.y + 20, this.width - 60, this.height - 80);
        ctx.stroke();
      }

      if (this.bubble) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "orange";
        ctx.rect(this.x + 20, this.y + 20, this.width - 60, this.height - 40);
        ctx.stroke();
      }
    }

    if (this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "orange";
      ctx.rect(this.x + 30, this.y + 650, this.width - 240, this.height - 900);
      ctx.stroke();
    }

    if (this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "purple";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }

    if (this instanceof Bubble) {
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
      ctx.rect(this.x + 30, this.y + 50, this.width - 60, this.height - 70);
      ctx.stroke();
    }

    if (this instanceof Barrier) {
      if (this.barrierNumber === 1) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "yellow";
        ctx.rect(this.x + 40, this.y, this.width - 600, this.height - 780);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "orange";
        ctx.rect(this.x + 1150, this.y, this.width - 1500, this.height - 680);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        ctx.rect(this.x + 1350, this.y, this.width - 1380, this.height - 760);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 20,
          this.y + 950,
          this.width - 1600,
          this.height - 950
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(
          this.x + 130,
          this.y + 850,
          this.width - 190,
          this.height - 850
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "pink";
        ctx.rect(
          this.x + 550,
          this.y + 800,
          this.width - 800,
          this.height - 1040
        );
        ctx.stroke();
      }

      if (this.barrierNumber === 2) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "yellow";
        ctx.rect(
          this.x + 50,
          this.y + 340,
          this.width - 1180,
          this.height - 340
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "orange";
        ctx.rect(
          this.x + 310,
          this.y + 130,
          this.width - 1100,
          this.height - 130
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        ctx.rect(this.x + 630, this.y + 40, this.width - 900, this.height - 40);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + 1150,
          this.y + 260,
          this.width - 1210,
          this.height - 260
        );
        ctx.stroke();
      }

      if (this.barrierNumber === 3) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(this.x + 50, this.y, this.width - 70, this.height);
        ctx.stroke();
      }
    }
  }
}
