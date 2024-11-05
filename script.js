let canvas;
let world;
let startScreen;
let winScreen;
let gameOverScreen;
let keyboard;
let collectedCoins = 0;
let hitJelly = 0;
let hitPuffer = 0;
let highScore = 0;

function init() {
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("start_screen");
  winScreen = document.getElementById("win_screen");
  gameOverScreen = document.getElementById("game_over_screen");
  keyboard = new Keyboard();
}

function startGame() {
  let start = document.getElementById("start_screen");
  start.classList.add("d-none");
  highScore = 0;
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

function toggleMenu(dialog) {
  let start = document.getElementById("menu");
  let character = document.getElementById("legal_notice");
  let legalNotice = document.getElementById("character");
  let dialogContent = document.getElementById(`${dialog}`);

  start.classList.toggle("d-none");
  character.classList.toggle("d-none");
  legalNotice.classList.toggle("d-none");
  dialogContent.classList.toggle("d-none");
}

function backToStart(dialog) {
  collectedCoins = 0;
  hitJelly = 0;
  hitPuffer = 0;
  highScore = 0;

  let start = document.getElementById("start_screen");
  let end = document.getElementById(`${dialog}`);

  start.classList.remove("d-none");
  end.classList.add("d-none");
}

function gameOver() {
  setHighScore();
  canvas.classList.add("d-none");
  gameOverScreen.classList.remove("d-none");
}

function setHighScore() {
  highScore = collectedCoins + 2 * hitJelly + 3 * hitPuffer;

  setField(collectedCoins, "collected_coins");
  setField(hitJelly, "hit_jelly");
  setField(hitPuffer, "hit_puffer");
  setField(highScore, "high_score");
}

function setField(number, id) {
  let field = document.getElementById(id);
  field.innerHTML = "";
  field.innerHTML = number;
}
