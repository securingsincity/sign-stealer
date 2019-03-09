const tf = require('@tensorflow/tfjs');
// const normalize = require('./utils').normalize;
// const { training, test } = require('./trainingData.js')


const training = require('./trainingData.json')
const test = require('./testData.json')

const TRAINING_DATA_LENGTH = 10000;
const TEST_DATA_LENGTH = 200;

// Solve for XOR
const LEARNING_RATE = 0.1;
const EPOCHS = 200;

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
  // Try the model on a value
   const input = tf.tensor2d([0,1,2,3,4], [1,5]);
   const predictOut = model.predict(input);
   const logits = Array.from(predictOut.dataSync());
   console.log('prediction', logits, predictOut.argMax(-1).dataSync()[0]);
});




// const trainingData =
//     tf.data.array(trainingSet)
//         .map(transform)
//         .shuffle(TRAINING_DATA_LENGTH)
//         .batch(50);

// const testValidationData =
//     tf.data.array(test())
//         .map(transform)
//         .batch(TEST_DATA_LENGTH);

// const model = tf.sequential();
// model.add(tf.layers.dense({units: 25, activation: 'relu', inputShape: [5]}));
// model.add(tf.layers.dense({units: 10, activation: 'relu'}));
// model.add(tf.layers.dense({units: 5, activation: 'softmax'}));
// model.compile({
//   optimizer: tf.train.adam(),
//   loss: 'sparseCategoricalCrossentropy',
//   metrics: ['accuracy']
// });


// async function run(epochCount, savePath) {
//   model.summary();
//   await model.fitDataset(trainingData, {
//     epochs: epochCount,
//     callbacks: {
//       onEpochEnd: async (epoch, logs) => {
//         console.log(`Epoch: ${epoch} - loss: ${logs.loss.toFixed(3)}`);
//       }
//     }
//   });

//   // Eval against test data:
//   await testValidationData.forEach((data) => {
//     const evalOutput =
//         model.evaluate(data[0], data[1], TEST_DATA_LENGTH);

//     console.log(
//         `\nEvaluation result:\n` +
//         `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; ` +
//         `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);
//   });

//   if (savePath !== null) {
//     await model.save(`file://${savePath}`);
//     console.log(`Saved model to path: ${savePath}`);
//   }
// }


// // const args = parser.parseArgs();

// run(10, 'model');
