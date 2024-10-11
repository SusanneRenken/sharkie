class BackgroundObject extends MovableObject {  
    width = mainWidth;
    height = mainHeight;

    constructor(imbagePath) {
      super().loadImage(imbagePath);
    }
  }