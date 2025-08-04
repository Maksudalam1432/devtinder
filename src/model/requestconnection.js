
const  mongoose =require("mongoose")

 const connectrequest= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
  },
  Status:{
    type:String ,
    require:true,
    enum:{
        values:["ignore","interested","accepted","rejected"],
        message:`{VALUE} is incorrect status`
        
    }
  }
 },
 {
  
  imestamps:true,
 }
);
const connectionrequestmodel=new mongoose.model(
  "requestconnection",
   connectrequest
)

module.exports=connectionrequestmodel;