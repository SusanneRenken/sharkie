const COIN_POSITIONS = [
  { x: 0, y: 0 },
  { x: 95, y: 155 },
  { x: 280, y: 235 },
  { x: 490, y: 235 },
  { x: 680, y: 155 },
  { x: 775, y: 0 },
];

/**
 * Determines the starting positions for coin collections in the game world.
 * @param {Object} world - The game world object.
 */
function getStartPlacesCoins(world) {
  let numberOfCoinCollection = (world.backgroundRepeat - 1) * 2;
  let lengthCoinArea =
    2 * 1920 * (world.backgroundRepeat - 0.5) - world.coinCollectionWidth;
  let newStart = 1920;
  let newXPlace = 0;

  for (let i = 0; i < numberOfCoinCollection; i++) {
    let areaLength = (lengthCoinArea - newStart) / (numberOfCoinCollection - i);
    let randomNumber = Math.random() * areaLength;
    newXPlace = Math.floor(newStart + randomNumber);
    world.xCoinPlaces.push(newXPlace);
    newStart = newXPlace + world.coinCollectionWidth;
  }
}

/**
 * Generates coins in the game world at predetermined positions.
 * @param {Object} world - The game world object.
 */
function generateCoins(world) {
  world.xCoinPlaces.forEach((place) => {
    let xPlace = place;
    let yPlace = 0.1 * 1080 + Math.random() * 0.7 * 1080;
    let isCoinFormLine = Math.random() < 0.5 ? false : true;
    let coinDirection = yPlace < 0.5 * 1080 ? 1 : -1;

    if (isCoinFormLine) {
      placeCoinInLine(xPlace, yPlace, coinDirection, world);
    } else {
      placeCoinOnParabola(xPlace, yPlace, coinDirection, world);
    }
  });
}

/**
 * Places coins in a straight line in the game world.
 * @param {number} xPlace - The starting x-coordinate.
 * @param {number} yPlace - The starting y-coordinate.
 * @param {number} coinDirection - The direction in which the coins are placed.
 * @param {Object} world - The game world object.
 */
function placeCoinInLine(xPlace, yPlace, coinDirection, world) {
  let numberOfCoins = 2 + Math.floor(Math.random() * 4);

  for (let i = 0; i < numberOfCoins; i++) {
    world.coins.push(new Coin(xPlace, yPlace, world));
    xPlace += 120;
    yPlace += 95 * coinDirection;
  }
}

/**
 * Places coins in a parabolic formation in the game world.
 * @param {number} xPlace - The starting x-coordinate.
 * @param {number} yPlace - The starting y-coordinate.
 * @param {number} coinDirection - The direction in which the coins are placed.
 * @param {Object} world - The game world object.
 */
function placeCoinOnParabola(xPlace, yPlace, coinDirection, world) {
  COIN_POSITIONS.forEach((position) => {
    world.coins.push(
      new Coin(xPlace + position.x, yPlace + position.y * coinDirection, world)
    );
  });
}

/**
 * Determines the areas between coin collections where barriers can be placed.
 * @param {Object} world - The game world object.
 */
function getBarrierAreas(world) {
  for (let i = 0; i < world.xCoinPlaces.length - 1; i++) {
    let areaWidth = Math.floor(
      world.xCoinPlaces[i + 1] -
        world.xCoinPlaces[i] -
        world.coinCollectionWidth
    );
    world.barrierAreas.push(areaWidth);
  }
}

/**
 * Checks available areas for placing barriers and generates them if possible.
 * @param {Object} world - The game world object.
 */
function checkBarrierAreas(world) {
  let isBarrierPlaced = false;

  const BARRIER_DIMENSIONS = [
    { barrierWidth: 1682, barrierHeight: 1080 },
    { barrierWidth: 1415, barrierHeight: 649 },
    { barrierWidth: 320, barrierHeight: 660 },
  ];

  for (let i = 0; i < world.barrierAreas.length; i++) {
    const area = world.barrierAreas[i];
    for (let j = 0; j < 3; j++) {
      if (area > BARRIER_DIMENSIONS[j].barrierWidth && !isBarrierPlaced) {
        isBarrierPlaced = Math.random() < 0.7 ? true : false;
        if (isBarrierPlaced) {
          generateBarriers(world, j + 1, i, area, BARRIER_DIMENSIONS);
        }
      }
    }
    isBarrierPlaced = false;
  }
}

/**
 * Generates barriers in the game world based on available space and dimensions.
 * @param {Object} world - The game world object.
 * @param {number} barrierNumber - The number representing the type of barrier.
 * @param {number} i - The index of the area to place the barrier.
 * @param {number} area - The width of the area where the barrier is to be placed.
 * @param {Array} BARRIER_DIMENSIONS - Array containing the dimensions of barriers.
 */
function generateBarriers(world, barrierNumber, i, area, BARRIER_DIMENSIONS) {
  let width = BARRIER_DIMENSIONS[barrierNumber - 1].barrierWidth;
  let height = BARRIER_DIMENSIONS[barrierNumber - 1].barrierHeight;
  let randomLength = Math.random() * (area - width);
  let xBarrierPlace =
    world.xCoinPlaces[i] + world.coinCollectionWidth + randomLength;

  world.barriers.push(
    new Barrier(barrierNumber, width, height, xBarrierPlace, world)
  );
}

/**
 * Checks if an object is within a barrier.
 * @param {number} objectX - The x-coordinate of the object.
 * @param {number} objectWidth - The width of the object.
 * @param {Array} barriers - Array containing all barriers in the world.
 * @returns {boolean} True if the object is within a barrier, false otherwise.
 */
function isObjectInBarrier(objectX, objectWidth, barriers) {
  return barriers.some(
    (barrier) =>
      objectX >= barrier.x - 1.2 * objectWidth &&
      objectX <= barrier.x + barrier.width + 0.2 * objectWidth
  );
}
