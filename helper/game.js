let canvas;
let world;
let keyboard = new Keyboard();


window.addEventListener("resize", init);

function init() {
  resizeCanvas();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

document.addEventListener("keydown", (event) => setKey(event.code, true));
document.addEventListener("keyup", (event) => setKey(event.code, false));

function setKey(code, isPressed) {
  const keyUpperCase = code.toUpperCase();
  if (keyUpperCase in keyboard) {
    keyboard[keyUpperCase] = isPressed;
  }
}
