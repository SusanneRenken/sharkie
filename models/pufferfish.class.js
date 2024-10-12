class Pufferfish extends MovableObject {
  width = 241 * mainScale;
  height = 198 * mainScale;

  constructor() {
    super().loadImage("./img/enemy/pufferfish/green/swim1.png");

    this.x =
      mainWidth * 0.42 +
      Math.random() * (mainWidth - this.width - mainWidth * 0.42);
    this.y = Math.random() * (mainHeight - this.height);

    this.animate();
  }

  animate(){
    setInterval(() =>{
      this.x -= 0.25;
    }, 1000 / 60);
    
  }


}
