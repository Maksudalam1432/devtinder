const express=require("express")
const requestrouter=express.Router();

const {useauth}=require("../middlewares/auth")

requestrouter.post("/sendconnectionreq", useauth, async (req, res) => {
  
    const user = req.user;
  
    console.log("sending a connection request")
    res.send(user.firstName + "send the connection request")
      
});

module.exports=requestrouter;