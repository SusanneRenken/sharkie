let mainWidth;
let mainHeight;
let mainScale;
let backgroundRepeat = 2;

function resizeCanvas() {
  let container = document.getElementById("canvas_container");
  let canvas = document.getElementById("canvas");
  let maxWidth = Math.min(container.clientWidth, window.innerWidth * 0.9);
  let maxHeight = (window.innerHeight - 60) * 0.9;

  let dimensions = calculateAspectRatio(maxWidth, maxHeight);
  mainWidth = dimensions.width;
  mainHeight = dimensions.height;
  mainScale = mainHeight / 1080;

  setCanvasDimensions(canvas, mainWidth, mainHeight);
}

function calculateAspectRatio(maxWidth, maxHeight) {
  let width = maxWidth;
  let height = width * (9 / 16);

  if (height > maxHeight) {
    height = maxHeight;
    width = height * (16 / 9);
  }

  return {
    width: Math.floor(width),
    height: Math.floor(height),
  };
}

function setCanvasDimensions(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

window.addEventListener("resize", resizeCanvas);
