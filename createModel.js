const tf = require('@tensorflow/tfjs-node');

const path = require('path')

const training = require('./trainingData.json')
const test = require('./testData.json')

const TRAINING_DATA_LENGTH = 2500;
const TEST_DATA_LENGTH = 15;

// Solve for XOR
const LEARNING_RATE = 0.1;
const EPOCHS = 30;

const trainingSet = training
// const testDataSet = test()

let xTrain = tf.tensor2d(trainingSet.xs, [TRAINING_DATA_LENGTH, 5]);
let yTrain = tf.oneHot(tf.tensor1d(trainingSet.ys).toInt(), 5);

let xTest = tf.tensor2d(test.xs, [TEST_DATA_LENGTH, 5]);
let yTest = tf.oneHot(tf.tensor1d(test.ys).toInt(), 5);
const model = tf.sequential();

model.add(tf.layers.dense({units: 25, activation: 'sigmoid', inputShape: [5]}));
model.add(tf.layers.dense({ units: 5, activation: 'softmax', outputShape: [1] }));
const optimizer = tf.train.adam(LEARNING_RATE);

model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
});
// con
model.fit(xTrain, yTrain, {
  epochs: EPOCHS,
  validationData: [xTest, yTest],
}).then(()=>{

  return model.save(`file://${path.join(__dirname,'model')}`);
});


