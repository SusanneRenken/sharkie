class World {
  character = new Character();
  enemies = [
    new Jellyfish(),
    new Pufferfish(),
    new Jellyfish(),
    new Pufferfish(),
  ];
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );

    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.img,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
    })
  }
}
