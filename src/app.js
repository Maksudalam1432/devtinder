const express = require("express");
require('./config/data')
const app = express();


app.listen(3000, () => {
  console.log("App successfully running on port 3000");
});
