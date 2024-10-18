function getStartPlaces(backgroundRepeat, xStartPlaces, coinCollectionWidth) {
  let numberOfCoinCollection = (backgroundRepeat - 1) * 2;
  let lengthCoinArea =
    2 * mainWidth * (backgroundRepeat - 0.5) - coinCollectionWidth;
  let newStart = mainWidth;
  let newXPlace = 0;

  for (let i = 0; i < numberOfCoinCollection; i++) {
    let areaLength = (lengthCoinArea - newStart) / (numberOfCoinCollection - i);
    let randomNumber = Math.random() * areaLength;
    newXPlace = Math.floor(newStart + randomNumber);
    xStartPlaces.push(newXPlace);
    newStart = newXPlace + coinCollectionWidth;
  }
}

function generateCoins(xStartPlaces, coins) {
  xStartPlaces.forEach((place) => {
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
