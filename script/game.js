let canvas;
let world;

function init() {
  resizeCanvas();
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}
