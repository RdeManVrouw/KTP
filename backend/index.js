const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ 
    message: "Data received!",
    data: req.body,
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


