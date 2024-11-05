class StatusBar extends DrawableObject {
  IMAGES_STATUSBAR = [
    "./img/collectibles/heart.png",
    "./img/collectibles/coin.png",
    "./img/collectibles/poison.png",
  ];
  world;

  constructor(world) {
    super();
    this.world = world;
    this.loadImages(this.IMAGES_STATUSBAR);
    this.imageProperties = [
      {
        x: 40,
        y: 34,
        width: 140,
        height: 140,
        numberWidth: -10,
      },
      {
        x: 280,
        y: 52,
        width: 140,
        height: 140,
        numberWidth: 0,
      },
      {
        x: 520,
        y: 21,
        width: 174,
        height: 170,
        numberWidth: -31,
      },
    ];
  }

  drawObject(ctx) {
    const values = [
      this.world.character.objectLife,
      collectedCoins,
      this.world.character.objectPoisons,
    ];

    this.IMAGES_STATUSBAR.forEach((path, index) => {
      const img = this.imageCache[path];
      const { x, y, width, height, numberWidth } = this.imageProperties[index];
      const value = values[index];
      let fontSize = 84;
      ctx.drawImage(img, x, y, width, height);
      ctx.font = `${fontSize}px LuckiestGuy`;
      ctx.fillStyle = "white";
      ctx.fillText(value, x + width + numberWidth, 150);
    });
  }
}
