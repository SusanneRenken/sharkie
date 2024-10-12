class Jellyfish extends MovableObject {  
  width = 211 * mainScale;
  height = 300 * mainScale;
  x = (mainWidth * 0.42) + Math.random() * ((mainWidth - this.width) - (mainWidth * 0.42));
  y = Math.random() * (mainHeight - this.height);
  COLOR = ["green", "lila", "pink", "yellow"];
  selectedColor;

  constructor() {
    super();
    this.getRandomColor();
    this.loadImage(`./img/enemy/jellyfish/${this.selectedColor}/swim1.png`);

    this.x =
      mainWidth * 0.42 +
      Math.random() * (mainWidth - this.width - mainWidth * 0.42);
    this.y = Math.random() * (mainHeight - this.height);

    this.animate();
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.COLOR.length);
    this.selectedColor = this.COLOR[randomIndex];
  }

  animate(){
    setInterval(() =>{
      this.x -= 0.15;
    }, 1000 / 60);
    
  }


}
