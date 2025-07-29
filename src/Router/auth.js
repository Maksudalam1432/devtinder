const express=require("express")
const authrouter=express.Router()
const {validatorsingupdata}=require("../utills/validation")
const bcrypt=require("bcrypt")
const user=require('../model/user')


authrouter.post("/singup", async(req , res)=>{
  
 

      
  
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

 authrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await user.findOne({ email });

    if (!users) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await users.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await users.getJWT();
    res.cookie("token", token);
    res.send("Login successful");
    console.log(token);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authrouter.post("/logout",async (req ,res)=>{
  res.cookie("token",null, {
  expires : new Date(Date.now())

  });
  res.send("logoup succesfully")
})

module.exports=authrouter;