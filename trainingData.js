const fs = require('fs')
module.exports.results = {
  BIG_LEAD: 0,
  STEAL: 1,
  SWING_THROUGH: 2,
  BUNT: 3,
  HIT_AND_RUN: 4
};
module.exports.signs = {
  DO_NOTHING: 0,
  TAP_HAT: 1,
  TAP_LEFT_ARM: 2,
  TAP_RIGHT_ARM: 3,
  TAP_CHEST: 4,
  SLIDE_HAT: 5,
  SLIDE_LEFT_ARM: 6,
  SLIDE_RIGHT_ARM: 7,
  SLIDE_CHEST: 8,
  LICK_LIPS: 9,
  PULL_LEFT_EAR: 10,
  PULL_RIGHT_EAR: 11,
};


module.exports.training = () => {
  let testData = {
    xs: [],
    ys: []
  }
  for (let index = 0; index < 10000; index++) {
    testData['xs'][index] = [
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
    ]
    testData['ys'][index] = Math.floor(Math.random() * 5)
  }
  fs.writeFileSync('./trainingData.json', JSON.stringify(testData))
}

module.exports.test = () => {
  let testData = {
    xs: [],
    ys: []
  }
  for (let index = 0; index < 200; index++) {
    testData['xs'][index] = [
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
    ]
    testData['ys'][index] = Math.floor(Math.random() * 5)
  }
  fs.writeFileSync('./testData.json', JSON.stringify(testData))
}