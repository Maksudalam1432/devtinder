const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://localhost:27017/devtinder"
  );
};

connectDB()
  .then(() => {
    console.log("Database is successful");
  })
  .catch((err) => {
    console.log("Database is not successful");
   
  });
