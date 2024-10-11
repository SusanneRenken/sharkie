let canvas;
let world;

function init() {
  resizeCanvas();
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("My character is", world.character);
  console.log("My enemies are", world.enemies);
}
