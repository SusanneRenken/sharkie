let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  resizeCanvas();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

document.addEventListener('keydown', (event) => setKey(event.code, true));
document.addEventListener('keyup', (event) => setKey(event.code, false));

function setKey(code, isPressed){
  const keyUpperCase = code.toUpperCase();
  console.log(keyUpperCase);
  if (keyboard[keyUpperCase]) {
    keyboard[keyUpperCase] = isPressed;
  }
}
