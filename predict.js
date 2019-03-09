const tf = require("@tensorflow/tfjs-node");
const path = require("path");
async function main() {
  const model = await tf.loadLayersModel(
    `file://${path.join(__dirname, "model/model.json")}`
  );

  const input = tf.tensor2d([7,4,3,3,3], [1, 5]);
  const predictOut = model.predict(input);
  const logits = Array.from(predictOut.dataSync());
  console.log("prediction", predictOut.argMax(-1).dataSync()[0]);
}
main();
