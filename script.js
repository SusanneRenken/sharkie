let canvas;
let world;
let level;
let startScreen;
let winScreen;
let gameOverScreen;
let keyboard;
let characterLife;
let collectedPoison;
let collectedCoins;
let hitJelly;
let hitPuffer;
let highScore;

function init() {
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("start_screen");
  winScreen = document.getElementById("win_screen");
  gameOverScreen = document.getElementById("game_over_screen");
  keyboard = new Keyboard();
}

function startGame() {
  resetPoints();
  startScreen.classList.add("d-none");
  SOUND_GAME.currentTime = 0;
  SOUND_GAME.play();
  world = new World(canvas, keyboard);
}

function resetPoints() {
  level = 1;
  characterLife = 3;
  collectedPoison = 0;
  collectedCoins = 0;
  hitJelly = 0;
  hitPuffer = 0;
  highScore = 0;
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
  resetPoints();
  let start = document.getElementById("start_screen");
  let end = document.getElementById(`${dialog}`);

  start.classList.remove("d-none");
  end.classList.add("d-none");
}

function winLevel() {
  stopAllGameIntervals();
  SOUND_GAME.pause();
  world = null;
  level ++;
  addCharacterLife();
  winScreen.classList.remove("d-none");
}

function addCharacterLife(){
  if (level <= 3) {
    characterLife += 3;
  } else if (3 < level <= 8) {
    characterLife += 2;
  } else {
    characterLife++;
  }
}

function nextLevel() {
  winScreen.classList.add("d-none");
  SOUND_GAME.currentTime = 0;
  SOUND_GAME.play();
  world = new World(canvas, keyboard);
}

function gameOver() {
  stopAllGameIntervals();
  SOUND_GAME.pause();
  world = null;
  setHighScore();
  gameOverScreen.classList.remove("d-none");
}

function stopAllGameIntervals() {
  [
    world.character,
    world.sunlight,
    world.endBoss,
    ...world.coins,
    ...world.poisons,
    ...world.enemies,
    ...world.bubbles,
  ].forEach((obj) => obj.stopAllIntervals());
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
