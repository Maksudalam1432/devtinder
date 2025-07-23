const express = require("express");
require('./config/data')
const app = express();
const user=require('./model/user')

app.post("/singup", async(req , res)=>{
    const users=new user({
        firstName :"Maksud",
        LastName :"Alam",
        email:"maksud.patna@123",
       

    });
    await users.save()
    res.send("succesfully data  connect!")
})




app.listen(3000, () => {
  console.log("App successfully running on port 3000");
});
