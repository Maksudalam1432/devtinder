const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://maksudalam:maksudxyz@cluster0.9wtuf7x.mongodb.net/devtinder?retryWrites=true&w=majority&appName=Cluster0"
  );
};

connectDB()
  .then(() => {
    console.log("Database is successful");
  })
  .catch((err) => {
    console.log("Database is not successful");
   
  });
