const express = require('express')
const app = express()
const port = 3000
const tf = require("@tensorflow/tfjs-node");
const path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
let model;
async function main() {
  model = await tf.loadLayersModel(
    `file://${path.join(__dirname, "model/model.json")}`
  );
}
main();
const results = [
  'BIG_LEAD',
  'STEAL',
  'SWING_THROUGH',
  'BUNT',
  'HIT_AND_RUN',
]
app.post('/', (req, res) => {
  const sign = req.body.sign
  const input = tf.tensor2d(sign, [1, 5]);
  const predictOut = model.predict(input);
  res.json({
    prediction: results[predictOut.argMax(-1).dataSync()[0]]
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))