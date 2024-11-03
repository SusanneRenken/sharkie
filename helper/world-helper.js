const COIN_POSITIONS = [
  { x: 0, y: 0 },
  { x: 95, y: 155 },
  { x: 280, y: 235 },
  { x: 490, y: 235 },
  { x: 680, y: 155 },
  { x: 775, y: 0 },
];

function getStartPlacesCoins(world) {
  let numberOfCoinCollection = (world.backgroundRepeat - 1) * 2;
  let lengthCoinArea =
    2 * mainWidth * (world.backgroundRepeat - 0.5) - world.coinCollectionWidth;
  let newStart = mainWidth;
  let newXPlace = 0;

  for (let i = 0; i < numberOfCoinCollection; i++) {
    let areaLength = (lengthCoinArea - newStart) / (numberOfCoinCollection - i);
    let randomNumber = Math.random() * areaLength;
    newXPlace = Math.floor(newStart + randomNumber);
    world.xCoinPlaces.push(newXPlace);
    newStart = newXPlace + world.coinCollectionWidth;
  }
}

function generateCoins(world) {
  world.xCoinPlaces.forEach((place) => {
    let xPlace = place;
    let yPlace = 0.1 * mainHeight + Math.random() * 0.7 * mainHeight;
    let isCoinFormLine = Math.random() < 0.5 ? false : true;
    let coinDirection = yPlace < 0.5 * mainHeight ? 1 : -1;

    if (isCoinFormLine) {
      placeCoinInLine(xPlace, yPlace, coinDirection, world);
    } else {
      placeCoinOnParabola(xPlace, yPlace, coinDirection, world);
    }
  });
}

function placeCoinInLine(xPlace, yPlace, coinDirection, world) {
  let numberOfCoins = 2 + Math.floor(Math.random() * 4);

  for (let i = 0; i < numberOfCoins; i++) {
    world.coins.push(new Coin(xPlace, yPlace, world));
    xPlace += 120 * mainScale;
    yPlace += 95 * mainScale * coinDirection;
  }
}

function placeCoinOnParabola(xPlace, yPlace, coinDirection, world) {
  COIN_POSITIONS.forEach((position) => {
    world.coins.push(
      new Coin(
        xPlace + position.x * mainScale,
        yPlace + position.y * mainScale * coinDirection,
        world
      )
    );
  });
}

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

function checkBarrierAreas(world) {
  let isBarrierPlaced = false;

  const BARRIER_DIMENSIONS = [
    { barrierWidth: 1682 * mainScale, barrierHeight: 1080 * mainScale },
    { barrierWidth: 1415 * mainScale, barrierHeight: 649 * mainScale },
    { barrierWidth: 320 * mainScale, barrierHeight: 660 * mainScale },
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

function isObjectInBarrier(objectX, objectWidth, barriers) {
  return barriers.some(
    (barrier) =>
      objectX >= barrier.x - 1.2 * objectWidth * mainScale &&
      objectX <= barrier.x + barrier.width + 0.2 * objectWidth * mainScale
  );
}