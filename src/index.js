const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Please start the");
});

app.get("/hello", (req, res) => {
  res.send("Hello duniya");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
