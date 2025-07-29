const express=require("express")
const profilerouter=express.Router()
const {useauth}=require("../middlewares/auth")
const {validatoresedit}=require("../utills/validation")
const user=require("../model/user")

profilerouter.get("/profile/view", useauth, async (req, res) => {
  try {
    const users = req.user;
    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});


profilerouter.patch("/profile/edit", useauth, async (req, res) => {
  try {
    if (!validatoresedit(req)) {
      throw new Error("Invalid Edit Request");
    }

    const user = req.user;
    console.log("Before Update:", user);

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

   
    await user.save(); 

    console.log("After Update:", user);

    res.send(`${user.firstName}, your profile updated successfully`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports=profilerouter;