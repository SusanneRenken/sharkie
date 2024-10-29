class StatusBar extends DrawableObject {
  IMAGES_STATUSBAR = [
    "img/collectibles/heart.png",
    "img/collectibles/coin.png",
    "img/collectibles/poison.png",
  ];
  world;

  constructor(world) {
    super();
    this.world = world;
    this.loadImages(this.IMAGES_STATUSBAR);
    this.imageProperties = [
      {
        x: 40 * mainScale,
        y: 42 * mainScale,
        width: 140 * mainScale,
        height: 140 * mainScale,
        numberWidth: -10 * mainScale,
      },
      {
        x: 280 * mainScale,
        y: 52 * mainScale,
        width: 140 * mainScale,
        height: 140 * mainScale,
        numberWidth: 0,
      },
      {
        x: 520 * mainScale,
        y: 21 * mainScale,
        width: 174 * mainScale,
        height: 170 * mainScale,
        numberWidth: -31 * mainScale,
      },
    ];
  }

  drawObject(ctx) {
    const values = [
      this.world.character.objectLife,
      this.world.character.objectCoins,
      this.world.character.objectPoisons,
    ];

    this.IMAGES_STATUSBAR.forEach((path, index) => {
      const img = this.imageCache[path];
      const { x, y, width, height, numberWidth } = this.imageProperties[index];
      const value = values[index];
      let fontSize = 84 * mainScale;
      ctx.drawImage(img, x, y, width, height);
      ctx.font = `${fontSize}px LuckiestGuy`;
      ctx.fillStyle = "#FEFFA4";
      ctx.fillText(value, x + width + numberWidth, 150 * mainScale);
    });
  }
}
