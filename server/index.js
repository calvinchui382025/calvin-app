const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//======================================================
app.get("/api", (req, res) => {
  res.json({ message: "Successfully hit server!" });
});

const fakeDatabase = {
  counter: 0,
};

app.post("/setCounter", (req, res) => {
  const value = req?.body?.data?.val;
  fakeDatabase.counter = value;
  res.json({ counter: fakeDatabase.counter })
})
//======================================================
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});