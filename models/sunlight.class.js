class Sunlight extends MovableObject {
  width = mainWidth * 2;
  height = mainHeight;
  x = 0;
  y = 0;
  selectedColor = "";
  IMAGES_IDLE;
  IMAGES_SWIM;
  world;

  constructor(world) {
    super();
    this.world = world;
    this.loadImage("./img/background/layers/light/3.png");

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x = -(
        this.world.character.x -
        this.world.character.x *
          ((this.world.backgroundRepeat - 1) /
            (this.world.backgroundRepeat - 0.5))
      );
    }, 1000 / 60);
  }
}
