const tf = require("@tensorflow/tfjs-node");
const path = require("path");
async function main() {
  const model = await tf.loadLayersModel(
    `file://${path.join(__dirname, "model/model.json")}`
  );

  const input = tf.tensor2d([11,11,11,0,0], [1, 5]);
  const predictOut = model.predict(input);
  console.log("prediction", predictOut.argMax(-1).dataSync()[0]);
}
main();
