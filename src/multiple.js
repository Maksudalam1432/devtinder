const express = require('express');
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log("server");
  next(); 
});

// Route
app.get('/', (req, res,next) => {
  // res.send('Home Route');
  next();
},
(req, res,next) => {
  // res.send('Home Route');
    next();
},(req, res) => {
  res.send('Home 120Route');
},

);

// Start Server
app.listen(3000, () => {
  console.log("server is successfully running on PORT 3000");
});
