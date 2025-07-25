const express = require("express");
require('./config/data')
const app = express();
const user=require('./model/user')

app.use(express.json())

// app.post("/singup", async(req , res)=>{
  
//    console.log(req.body)
//     const users=new user({
//         firstName :"Washimali   ",
//         LastName :"Khan",
//         email:"washimkhan@123", 
       
//     });
//     await users.save()
//     res.send("succesfully data  connect!")
// })
app.post("/singup", async(req , res)=>{
  
   console.log(req.body)
    const { firstName,LastName, email } = req.body;

    const users = new user({
     firstName,
     LastName,
      email
      
    })
    await users.save()
    res.send("succesfully data  connect!")
})

 // find and findone

app.get("/user",async(req ,res)=>{
  const userid=req.body.email;

  // try {

  //   const users= await user.findOne({email:userid}).exec();;
  //   // const users= await user.find({email:userid});
  //   res.send(users)
  // }
  // catch(error){
  //     res.status(404).send("user not found")
  // }
  try {

    const users= await user.find({email:userid});
    res.send(users)
  }
  catch(error){
      res.status(404).send("user not found")
  }
})

// find by id 


app.get("/user", async (req, res) => {
  const userid = req.body.userid;

  try {
    const users = await user.findById(userid);

    if (!users) {
      return res.status(404).send("User not found");
    }

    res.send(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//findbyidanddeleta
app.delete("/user", async (req, res) => {
  const userid = req.body.userid;

  try {
    const User1 = await user.findByIdAndDelete(userid);

    if (User1) {
      return res.status(404).send("User not found");
    }

    res.send("Delete is successful");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

//update

app.patch("/user", async (req, res) => {
  const usersid = req.body.userid; // fix 1
  const data = req.body;

  try {

    const Allow_updates = ["skills", "photurl", "gender", "age", "about",];
    
    const isUpdate = Object.keys(data)
      .filter(key => key !== "userid")
      .every(key => Allow_updates.includes(key));

    if (!isUpdate) {
      throw new Error("Update not allowed"); // 
    }

    const updatedUser = await user.findByIdAndUpdate({ _id:usersid},data); 

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Error updating user: " + error.message);
  }
});





app.listen(3000, () => {
  console.log("App successfully running on port 3000");
});
