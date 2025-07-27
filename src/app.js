const express = require("express");
require('./config/data')
const app = express();
const user=require('./model/user')
const {validatorsingupdata}=require("./utills/validation")
const bcrypt=require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt=require("jsonwebtoken")

app.use(cookieParser());


 

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
  
  //  console.log(rconst {password}=req.body;

      
  
    try{
      validatorsingupdata(req)

        const {firstName,LastName,email,password}=req.body
         const passwordHash = await bcrypt.hash(password, 10); 
    console.log("Hashed Password:", passwordHash);

     
      const users=new user({
        firstName,
        LastName,
        email,
        password:passwordHash,
      });

      await users.save()
      res.send("succesfully data  connect!")
    }
    catch(err){
      res.status(400).send("Error :"+err.message)
    }
})
//login page

  app.post("/login", async (req ,res)=>{
      
    try{
        const {email, password}=req.body;
    const users=await user.findOne( {email:email});
     
    if(!users){
        throw new Error("Invaliud credentials ")
    }
    const ispassword= await bcrypt.compare(password,users.password);
    if(ispassword){
         const token=await jwt.sign({_id:users._id},"maksud@122#789")
      res.cookie("token",token)
       res.send("login succesfully")
       console.log(token)
    }
 else{
    throw new Error ("Invaliud credentials ")
 }
}
  
 catch(err){
   res.status(400).send("ERROR" + err.message)
      
    }

  })

     
  //profile
app.get("/profile", async (req , res)=>{
 try{
   const cookies = req.cookies;
  const {token}=cookies;
  if(!token){
     throw new Error("invalid token")
  }
  const decodemess=await jwt.verify(token,"maksud@122#789")
  const {_id}=decodemess;
  console.log("loggesd user id is ",_id)
  // console.log(cookies);
  const users=await user.findById(_id)
  if(!users){
    throw new Error("user does not exist")
  }
  res.send(users)
 }
  catch(err){
     res.status(400).send("ERROR "+ err.message)
  }
});




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
