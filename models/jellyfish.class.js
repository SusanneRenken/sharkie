class Jellyfish extends MovableObject {  
  width = 211 * mainScale;
  height = 300 * mainScale;
  x = (mainWidth * 0.42) + Math.random() * ((mainWidth - this.width) - (mainWidth * 0.42));
  y = Math.random() * (mainHeight - this.height);
  color = Math.random() * 3;

  constructor() {
    super().loadImage("./img/enemy/jellyfish/lila/swim1.png");

    this.x =
      mainWidth * 0.42 +
      Math.random() * (mainWidth - this.width - mainWidth * 0.42);
    this.y = Math.random() * (mainHeight - this.height);

    this.animate();
  }

  animate(){
    setInterval(() =>{
      this.x -= 0.15;
    }, 1000 / 60);
    
  }


}
