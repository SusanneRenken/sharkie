function getBarrierHitboxSizes(width, height) { 
    return [
    // Barriere 1
    [
      {
        offsetX: 20 * mainScale,
        offsetY: 0,
        offsetWidth: width - 600 * mainScale,
        offsetHeight: height - 780 * mainScale
      },
      {
        offsetX: 1150 * mainScale,
        offsetY: 0,
        offsetWidth: width - 1500 * mainScale,
        offsetHeight: height - 680 * mainScale
      },
      {
        offsetX: 1350 * mainScale,
        offsetY: 0,
        offsetWidth: width - 1380 * mainScale,
        offsetHeight: height - 760 * mainScale
      },
      {
        offsetX: 0,
        offsetY: 930 * mainScale,
        offsetWidth: width - 1600 * mainScale,
        offsetHeight: height - 930 * mainScale
      },
      {
        offsetX: 130 * mainScale,
        offsetY: 850 * mainScale,
        offsetWidth: width - 190 * mainScale,
        offsetHeight: height - 850 * mainScale
      },
      {
        offsetX: 550 * mainScale,
        offsetY: 800 * mainScale,
        offsetWidth: width - 800 * mainScale,
        offsetHeight: height - 1040 * mainScale
      }
    ],
    // Barriere 2
    [
      {
        offsetX: 50 * mainScale,
        offsetY: 330 * mainScale,
        offsetWidth: width - 1180 * mainScale,
        offsetHeight: height - 330 * mainScale
      },
      {
        offsetX: 290 * mainScale,
        offsetY: 120 * mainScale,
        offsetWidth: width - 1100 * mainScale,
        offsetHeight: height - 120 * mainScale
      },
      {
        offsetX: 610 * mainScale,
        offsetY: 20 * mainScale,
        offsetWidth: width - 860 * mainScale,
        offsetHeight: height - 20 * mainScale
      },
      {
        offsetX: 1170 * mainScale,
        offsetY: 260 * mainScale,
        offsetWidth: width - 1210 * mainScale,
        offsetHeight: height - 260 * mainScale
      }
    ],
    // Barriere 3
    [
      {
        offsetX: 30 * mainScale,
        offsetY: 0,
        offsetWidth: width - 50 * mainScale,
        offsetHeight: height
      }
    ]
  ];
}