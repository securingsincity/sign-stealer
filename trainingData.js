const fs = require('fs')
const results = {
  BIG_LEAD: 0,
  STEAL: 1,
  SWING_THROUGH: 2,
  BUNT: 3,
  HIT_AND_RUN: 4
};
const signs = {
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

const hitAndRun = () => {
  let testData = {
    xs: [],
    ys: []
  }
  for (let index = 0; index < 500; index++) {
    testData['xs'][index] = [
      Math.floor(Math.random() + 3),
      Math.floor(Math.random() * 12),
      3,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 2) + 1,
    ]
    testData['ys'][index] = results.HIT_AND_RUN
  }
  return testData
}

const steal = () => {
  let testData = {
    xs: [],
    ys: []
  }
  for (let index = 0; index < 500; index++) {
    testData['xs'][index] = [
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() + 4),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() + 5),
      Math.floor(Math.random() * 11),
    ]
    testData['ys'][index] = results.STEAL
  }
  return testData
}
const swingThrough = () => {
  let testData = {
    xs: [],
    ys: []
  }
  for (let index = 0; index < 500; index++) {
    testData['xs'][index] = [
      Math.floor(Math.random() + 8),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 2),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 5),
    ]
    testData['ys'][index] = results.SWING_THROUGH
  }
  return testData
}

const bigLead = () => {
  let testData = {
    xs: [],
    ys: []
  }
  for (let index = 0; index < 500; index++) {
    testData['xs'][index] = [
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 2),
      Math.floor(Math.random()) + 1,
    ]
    testData['ys'][index] = results.BIG_LEAD
  }
  return testData
}

const bunt = () => {
  let testData = {
    xs: [],
    ys: []
  }
  for (let index = 0; index < 500; index++) {
    testData['xs'][index] = [
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 4),
      Math.floor(Math.random()) * 3,
    ]
    testData['ys'][index] = results.BUNT
  }
  return testData
}

module.exports.training = () => {
  const bigLeadData = bigLead()
  const buntData = bunt()
  const hitAndRunData = hitAndRun()
  const swingData = swingThrough()
  const stealData = steal()
  let testData = {
    xs: [...bigLeadData.xs, ...buntData.xs, ...hitAndRunData.xs, ...swingData.xs, ...stealData.xs,],
    ys: [...bigLeadData.ys, ...buntData.ys, ...hitAndRunData.ys, ...swingData.ys, ...stealData.ys,],
  }

  fs.writeFileSync('./trainingData.json', JSON.stringify(testData))
}




module.exports.test = () => {

  const buntTestData = {
    xs: [[7,7,7,3,3], [4,7,7,4,0], [4,4,4,3,3]],
    ys: [results.BUNT, results.BUNT, results.BUNT]
  }
  const hitAndRunData = {
    xs: [[3,7,3,9,2], [2,11,3,1,0], [2,9,3,1,0]],
    ys: [results.HIT_AND_RUN, results.HIT_AND_RUN, results.HIT_AND_RUN]
  }
  const bigLeadTestData = {
    xs: [[7,11,0,2,0], [4,7,7,2,1], [6,1,12,1,1]],
    ys: [results.BIG_LEAD, results.BIG_LEAD, results.BIG_LEAD]
  }
  const swingThroughData = {
    xs: [[8,11,3,4,1], [8,11,3,11,4], [7,9,3,1,5]],
    ys: [results.SWING_THROUGH, results.SWING_THROUGH, results.SWING_THROUGH]
  }
  const stealData = {
    xs: [[6,5,7,6,10], [3,5,7,5,4], [2,4,8,5,5]],
    ys: [results.STEAL, results.STEAL, results.STEAL]
  }
  let testData = {
    xs: [
      ...buntTestData.xs,
      ...hitAndRunData.xs,
      ...bigLeadTestData.xs,
      ...swingThroughData.xs,
      ...stealData.xs,
    ],
    ys: [
      ...buntTestData.ys,
      ...hitAndRunData.ys,
      ...bigLeadTestData.ys,
      ...swingThroughData.ys,
      ...stealData.ys,
    ]
  }
  fs.writeFileSync('./testData.json', JSON.stringify(testData))
}