let canvas;
let world;
let keyboard = new Keyboard();

function startGame(){
  let start = document.getElementById('start_screen');
  start.classList.add('d-none');
  init();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

document.addEventListener("keydown", (event) => setKey(event.code, true));
document.addEventListener("keyup", (event) => setKey(event.code, false));

function setKey(code, isPressed) {
  const keyUpperCase = code.toUpperCase();
  if (keyUpperCase in keyboard) {
    keyboard[keyUpperCase] = isPressed;
  }
}

function toggleMenu(dialog){
  let start = document.getElementById('menu');
  let character = document.getElementById('character');
  let dialogContent = document.getElementById(`${dialog}`);

  start.classList.toggle('d-none');
  character.classList.toggle('d-none');
  dialogContent.classList.toggle('d-none');
}