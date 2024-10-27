function getStartPlacesCoins(
  backgroundRepeat,
  xCoinPlaces,
  coinCollectionWidth
) {
  let numberOfCoinCollection = (backgroundRepeat - 1) * 2;
  let lengthCoinArea =
    2 * mainWidth * (backgroundRepeat - 0.5) - coinCollectionWidth;
  let newStart = mainWidth;
  let newXPlace = 0;

  for (let i = 0; i < numberOfCoinCollection; i++) {
    let areaLength = (lengthCoinArea - newStart) / (numberOfCoinCollection - i);
    let randomNumber = Math.random() * areaLength;
    newXPlace = Math.floor(newStart + randomNumber);
    xCoinPlaces.push(newXPlace);
    newStart = newXPlace + coinCollectionWidth;
  }
}

function generateCoins(xCoinPlaces, coins) {
  xCoinPlaces.forEach((place) => {
    let xPlace = place;
    let yPlace = 0.1 * mainHeight + Math.random() * 0.7 * mainHeight;
    let coinForm = Math.random() < 0.5 ? 0 : 1;
    let coinDirection = yPlace < 0.5 * mainHeight ? 1 : -1;

    if (coinForm) {
      placeCoinInLine(xPlace, yPlace, coinDirection, coins);
    } else {
      placeCoinOnParabola(xPlace, yPlace, coinDirection, coins);
    }
  });
}

function placeCoinInLine(xPlace, yPlace, coinDirection, coins) {
  let numberOfCoins = 2 + Math.floor(Math.random() * 4);

  for (let i = 0; i < numberOfCoins; i++) {
    coins.push(new Coin(xPlace, yPlace));
    xPlace += 120 * mainScale;
    yPlace += 95 * mainScale * coinDirection;
  }
}

function placeCoinOnParabola(xPlace, yPlace, coinDirection, coins) {
  const coinPositions = [
    { x: 0, y: 0 },
    { x: 95, y: 155 },
    { x: 280, y: 235 },
    { x: 490, y: 235 },
    { x: 680, y: 155 },
    { x: 775, y: 0 },
  ];

  coinPositions.forEach((position) => {
    coins.push(
      new Coin(
        xPlace + position.x * mainScale,
        yPlace + position.y * mainScale * coinDirection
      )
    );
  });
}

function getBarrierAreas(barrierAreas, xCoinPlaces, coinCollectionWidth) {
  for (let i = 0; i < xCoinPlaces.length - 1; i++) {
    let areaWidth = Math.floor(
      xCoinPlaces[i + 1] - xCoinPlaces[i] - coinCollectionWidth
    );
    barrierAreas.push(areaWidth);
  }
}

function checkBarrierAreas(
  barrierAreas,
  BARRIER_DIMENSIONS,
  isBarrierPlaced,
  barriers,
  xCoinPlaces,
  coinCollectionWidth
) {
  for (let i = 0; i < barrierAreas.length; i++) {
    const area = barrierAreas[i];
    for (let j = 0; j < 3; j++) {
      if (area > BARRIER_DIMENSIONS[j].barrierWidth && !isBarrierPlaced) {
        isBarrierPlaced = Math.random() < 0.7 ? true : false;
        if (isBarrierPlaced) {
          generateBarriers(
            BARRIER_DIMENSIONS,
            j + 1,
            i,
            area,
            barriers,
            xCoinPlaces,
            coinCollectionWidth
          );
        }
      }
    }
    isBarrierPlaced = false;
  }
}

function generateBarriers(
  BARRIER_DIMENSIONS,
  barrierNumber,
  i,
  area,
  barriers,
  xCoinPlaces,
  coinCollectionWidth
) {
  let width = BARRIER_DIMENSIONS[barrierNumber - 1].barrierWidth;
  let height = BARRIER_DIMENSIONS[barrierNumber - 1].barrierHeight;
  let randomLength = Math.random() * (area - width);
  let xBarrierPlace = xCoinPlaces[i] + coinCollectionWidth + randomLength;

  barriers.push(new Barrier(barrierNumber, width, height, xBarrierPlace));
}

function isObjectInBarrier(objectX, objectWidth, barriers) {
  return barriers.some(
    (barrier) =>
      objectX >= barrier.x - 1.2 * objectWidth * mainScale &&
      objectX <= barrier.x + barrier.width + 0.2 * objectWidth * mainScale
  );
}
