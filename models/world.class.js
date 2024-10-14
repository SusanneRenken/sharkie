class World {
  character = new Character();
  enemies = [
    new Jellyfish(),
    new Jellyfish(),
    new Jellyfish(),
    new Pufferfish(),
    new Pufferfish(),
    new Pufferfish(),
  ];
  backgroundObjeckts = [
    new BackgroundObject("./img/background/layers/water/1.png"),
    new BackgroundObject("./img/background/layers/fondo-1/1.png"),
    new BackgroundObject("./img/background/layers/fondo-2/1.png"),
    new BackgroundObject("./img/background/layers/floor/1.png"),
    new BackgroundObject("./img/background/layers/light/1.png"),
  ];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");    
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjeckts);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  addObjectsToMap(objects){
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore(); 
    }
  }
}
