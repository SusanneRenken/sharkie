let canvas;
let world;
let level;
let startScreen;
let winScreen;
let gameOverScreen;
let controlScreen;
let screenImg;
let soundImg;
let fullScreen = false;
let keyboard;
let totalImages = 0;
let totalImagesLoaded = 0;
let characterLife;
let collectedPoison;
let collectedCoins;
let hitJelly;
let hitPuffer;
let highScore = 10;

document.addEventListener("DOMContentLoaded", initControls);
document.addEventListener("keydown", (event) => setKey(event.code, true));
document.addEventListener("keyup", (event) => setKey(event.code, false));
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

/**
 * Initializes the game by setting up necessary elements and assigning them to global variables.
 */
function init() {
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("start_screen");
  winScreen = document.getElementById("win_screen");
  gameOverScreen = document.getElementById("game_over_screen");
  controlScreen = document.getElementById("control_screen");
  screenImg = document.getElementById("fullscreen_btn");
  soundImg = document.getElementById("sound_btn");
  keyboard = new Keyboard();
}

/**
 * Toggles fullscreen mode for the game.
 */
function toggleFullscreen() {
  let gameBody = document.getElementById("fullscreen");

  if (fullScreen) {
    fullScreen = false;
    exitFullscreen(gameBody);
    screenImg.src = "./img/menuscreen/buttons/open-fullscreen.png";
  } else {
    fullScreen = true;
    enterFullscreen(gameBody);
    screenImg.src = "./img/menuscreen/buttons/close-fullscreen.png";
  }
}

/**
 * Requests fullscreen for the given element.
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode for the document.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Sets the key state for a given key code.
 * @param {string} code - The key code.
 * @param {boolean} isPressed - Whether the key is pressed or not.
 */
function setKey(code, isPressed) {
  const keyUpperCase = code.toUpperCase();
  if (keyUpperCase in keyboard) {
    keyboard[keyUpperCase] = isPressed;
  }
}

/**
 * Sets the key state for a given mobile control key.
 * @param {string} key - The key.
 * @param {boolean} isPressed - Whether the key is pressed or not.
 */
function setMobileKey(key, isPressed) {
  if (key in keyboard) {
    keyboard[key] = isPressed;
  }
}

/**
 * Initializes the control elements for mobile devices.
 */
function initControls() {
  const handleEvent = (control, isPressed) => {
    control.dataset.key
      .split(" ")
      .forEach((key) => setMobileKey(key, isPressed));
  };

  document.querySelectorAll(".control").forEach((control) => {
    addControlListeners(control, handleEvent);
  });
}

/**
 * Adds event listeners for control elements.
 * @param {HTMLElement} control - The control element.
 * @param {function} handleEvent - The event handler function.
 */
function addControlListeners(control, handleEvent) {
  control.addEventListener("mousedown", () => handleEvent(control, true));
  control.addEventListener("mouseup", () => handleEvent(control, false));
  control.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleEvent(control, true);
  });
  control.addEventListener("touchend", (e) => {
    e.preventDefault();
    handleEvent(control, false);
  });
}

/**
 * Toggles the visibility of the specified menu.
 * @param {string} dialog - The id of the dialog to toggle.
 */
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

/**
 * Starts the game by resetting points and initializing the world.
 */
function startGame() {
  resetPoints();
  world = new World(canvas, keyboard);
}

/**
 * Updates the character position based on the percentage of loaded images.
 */
function updateCharacterPosition() {
  const percentageLoaded = totalImagesLoaded / totalImages;
  document.documentElement.style.setProperty(
    "--loaded-images-percentage",
    percentageLoaded
  );
}

/**
 * Handles all necessary actions when all images are loaded.
 */
function allImagesLoaded() {
  startScreen.classList.add("d-none");
  winScreen.classList.add("d-none");
  SOUND_GAME.currentTime = 0;
  SOUND_GAME.play();
  screenImg.classList.add("d-none");
  controlScreen.classList.remove("d-none");
  soundImg.classList.remove("option-btn");

  totalImages = 0;
  totalImagesLoaded = 0;
}

/**
 * Resets all game points and statuses to their initial values.
 */
function resetPoints() {
  level = 1;
  characterLife = 3;
  collectedPoison = 0;
  collectedCoins = 0;
  hitJelly = 0;
  hitPuffer = 0;
  highScore = 0;
}

/**
 * Returns to the start screen and resets points.
 * @param {string} dialog - The id of the dialog to close.
 */
function backToStart(dialog) {
  resetPoints();
  let start = document.getElementById("start_screen");
  let end = document.getElementById(`${dialog}`);
  start.classList.remove("d-none");
  end.classList.add("d-none");
  resetLeaderboard();  
  document.documentElement.style.setProperty("--loaded-images-percentage", 0);
}

/**
 * Resets the leaderboard display by hiding and showing relevant elements.
 */
function resetLeaderboard(){
  let higtScore = document.getElementById("high_score");
  let leaderboard = document.getElementById("leaderboard");
  let addToBoard = document.getElementById("add_to_board");
  let rankOnLeaderboard = document.getElementById("rank_on_leaderboard");
  higtScore.classList.remove("d-none");
  leaderboard.classList.add("d-none");
  addToBoard.classList.remove("d-none");
  rankOnLeaderboard.classList.add("d-none");
}

/**
 * Handles the actions when the player wins a level.
 */
function winLevel() {
  stopAllGameIntervals();
  SOUND_GAME.pause();
  world = null;
  level++;
  setField(level, "next_level");
  addCharacterLife();
  screenImg.classList.remove("d-none");
  controlScreen.classList.add("d-none");
  soundImg.classList.add("option-btn");
  winScreen.classList.remove("d-none");
}

/**
 * Adds extra character life based on the current level.
 */
function addCharacterLife() {
  if (level <= 3) {
    characterLife += 3;
  } else if (3 < level <= 8) {
    characterLife += 2;
  } else {
    characterLife++;
  }
}

/**
 * Proceeds to the next level by reinitializing the world.
 */
function nextLevel() {
  world = new World(canvas, keyboard);
}

/**
 * Handles the actions when the player loses the game.
 */
function gameOver() {
  stopAllGameIntervals();
  SOUND_GAME.pause();
  world = null;
  setHighScore();
  screenImg.classList.remove("d-none");
  controlScreen.classList.add("d-none");
  soundImg.classList.add("option-btn");
  gameOverScreen.classList.remove("d-none");
}

/**
 * Stops all intervals in the game, affecting all world objects.
 */
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

/**
 * Sets the high score based on collected items and defeated enemies.
 */
function setHighScore() {
  highScore = collectedCoins + 2 * hitJelly + 3 * hitPuffer;

  setField(collectedCoins, "collected_coins");
  setField(hitJelly, "hit_jelly");
  setField(hitPuffer, "hit_puffer");
  setField(highScore, "high_score_number");
}

/**
 * Updates the content of the specified HTML field.
 * @param {number} number - The number to set in the field.
 * @param {string} id - The id of the field element.
 */
function setField(number, id) {
  let field = document.getElementById(id);
  field.innerHTML = "";
  field.innerHTML = number;
}

/**
 * Checks the screen orientation and shows or hides the "rotate device" message accordingly.
 */
function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    document.getElementById("rotate-device").classList.remove("d-none");
  } else {
    document.getElementById("rotate-device").classList.add("d-none");
  }
}
