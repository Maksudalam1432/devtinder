const express = require("express");
const app = express();
const connectDB = require("./config/data");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

 const authrouter=require("./Router/auth")
 const profilerouter=require("./Router/profile")
 const requestrouter=require("./Router/request")

 app.use("/",authrouter);
 app.use("/",profilerouter);
 app.use("/",requestrouter);

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("App successfully running on port 3000");
    });

    console.log("Database is successful");
  })
  .catch((err) => {
    console.log("Database is not successful");
  });
