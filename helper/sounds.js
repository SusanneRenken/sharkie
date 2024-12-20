let soundEnabled = true;

const SOUND_GAME = new Audio("./audio/backgroundsound.mp3");
SOUND_GAME.volume = 0.1;
SOUND_GAME.loop = true;

const SOUND_CHARACTER_SWIM = new Audio("./audio/character-swim.mp3");
SOUND_CHARACTER_SWIM.volume = 0.4;
SOUND_CHARACTER_SWIM.loop = true;

const SOUND_CHARACTER_ATTACK = new Audio("./audio/character-attack.mp3");
SOUND_CHARACTER_ATTACK.volume = 0.3;

const SOUND_CHARACTER_BUB_N = new Audio("./audio/character-bubble-shot.mp3");
SOUND_CHARACTER_BUB_N.volume = 0.3;

const SOUND_CHARACTER_BUB_P = new Audio("./audio/character-bubble-shot2.mp3");
SOUND_CHARACTER_BUB_P.volume = 1;

const SOUND_CHARACTER_HIT_A = new Audio("./audio/character-hurt-attac.mp3");
SOUND_CHARACTER_HIT_A.volume = 0.3;

const SOUND_CHARACTER_HIT_E = new Audio(
  "./audio/character-hurt-electric-shock1.mp3"
);
SOUND_CHARACTER_HIT_E.volume = 0.3;

const SOUND_CHARACTER_HIT_P = new Audio("./audio/character-hurt-poisoned.mp3");
SOUND_CHARACTER_HIT_P.volume = 0.3;

const SOUND_CHARACTER_DEAD_A = new Audio("./audio/character-dead-a.mp3");
SOUND_CHARACTER_DEAD_A.volume = 0.3;

const SOUND_CHARACTER_DEAD_E = new Audio("./audio/character-dead-e.mp3");
SOUND_CHARACTER_DEAD_E.volume = 0.6;
SOUND_CHARACTER_DEAD_E.playbackRate = 0.8;

const SOUND_CHARACTER_SLEEP = new Audio("./audio/character-sleep.mp3");
SOUND_CHARACTER_SLEEP.volume = 0.2;
SOUND_CHARACTER_SLEEP.loop = true;

const SOUND_BUBBLE_BURST = new Audio("./audio/bubble-burst.mp3");
SOUND_BUBBLE_BURST.volume = 0.3;

const SOUND_PUFFER_DEAD = new Audio("./audio/puffer-dead.mp3");
SOUND_PUFFER_DEAD.volume = 0.3;
SOUND_PUFFER_DEAD.playbackRate = 2;

const SOUND_JELLY_DEAD = new Audio("./audio/jelly-dead.mp3");
SOUND_JELLY_DEAD.volume = 0.3;
SOUND_JELLY_DEAD.playbackRate = 1.2;

const SOUND_ENDBOSS_INTRODUCE = new Audio("./audio/endboss-introduce.mp3");
SOUND_ENDBOSS_INTRODUCE.volume = 0.3;

const SOUND_ENDBOSS_ATTACK = new Audio("./audio/endboss-attack.mp3");
SOUND_ENDBOSS_ATTACK.volume = 0.3;

const SOUND_ENDBOSS_HIT = new Audio("./audio/endboss-hit2.mp3");
SOUND_ENDBOSS_HIT.volume = 0.3;
SOUND_ENDBOSS_HIT.playbackRate = 2;

const SOUND_ENDBOSS_DEAD = new Audio("./audio/endboss-dead.mp3");
SOUND_ENDBOSS_DEAD.volume = 0.3;

const SOUND_COLLECT_COIN = new Audio("./audio/collect-coin.mp3");
SOUND_COLLECT_COIN.volume = 0.3;

const SOUND_COLLECT_POISON = new Audio("./audio/collect-poison.mp3");
SOUND_COLLECT_POISON.volume = 0.3;

const SOUND_COLLECT_HEART = new Audio("./audio/collect-heart.mp3");
SOUND_COLLECT_HEART.volume = 0.3;
SOUND_COLLECT_HEART.playbackRate = 2;

const allSounds = [
  SOUND_GAME,
  SOUND_CHARACTER_SWIM,
  SOUND_CHARACTER_ATTACK,
  SOUND_CHARACTER_BUB_N,
  SOUND_CHARACTER_BUB_P,
  SOUND_CHARACTER_HIT_A,
  SOUND_CHARACTER_HIT_E,
  SOUND_CHARACTER_HIT_P,
  SOUND_CHARACTER_DEAD_A,
  SOUND_CHARACTER_DEAD_E,
  SOUND_CHARACTER_SLEEP,
  SOUND_BUBBLE_BURST,
  SOUND_PUFFER_DEAD,
  SOUND_JELLY_DEAD,
  SOUND_ENDBOSS_INTRODUCE,
  SOUND_ENDBOSS_ATTACK,
  SOUND_ENDBOSS_HIT,
  SOUND_ENDBOSS_DEAD,
  SOUND_COLLECT_COIN,
  SOUND_COLLECT_POISON,
  SOUND_COLLECT_HEART,
];

/**
 * Toggles the sound on or off in the game.
 * Changes the sound state and updates all sound elements accordingly.
 */
function toggleSound() {
  soundEnabled = !soundEnabled;

  allSounds.forEach((sound) => {
    sound.muted = !soundEnabled;
  });

  let soundImg = document.getElementById("sound_btn");
  soundImg.src = soundEnabled
    ? "./img/menuscreen/buttons/sound.png"
    : "./img/menuscreen/buttons/mute.png";
}

