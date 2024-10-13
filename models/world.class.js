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

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");    
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this.world;
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.addObjectsToMap(this.backgroundObjeckts);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

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
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
