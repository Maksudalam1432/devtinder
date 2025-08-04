const express=require("express")
const requestrouter=express.Router();

const {useauth}=require("../middlewares/auth")
const requestconnection=require("../model/requestconnection")

requestrouter.post("/request/send/:Status/:toUserId", useauth, async (req, res) => {

     try{
       fromUserId=req.user._id;
       toUserId=req.params.toUserId;
       Status:req.params.Status

       const connectreq=new requestconnection ({
        fromUserId,
        toUserId,
        Status,
       })

       
     
     } catch(err){
         res.status(400).send("ERROR",+ err.message)
     }


  

    console.log("sending a connection request")
    res.send(user.firstName + "send the connection request")
      
});

module.exports=requestrouter;