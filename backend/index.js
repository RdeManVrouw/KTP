const express = require("express");
const cors = require("cors");
const app = express();
const Program = require("./compiler.js");
const inference_engine_txt = require("./knowledge_base.js");

app.use(cors());
app.use(express.json());

let prgm = Program.compile(inference_engine_txt);

app.get('/', (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/', (req, res) => {
  prgm.setFact(req.body.name, req.body.value);
  if (prgm.stepBackwardchain()){
    res.json({ state: "execution complete", facts: prgm.parameters });
    return;
  }
  console.log(prgm.message);
  res.json({
    "x": "y"
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
