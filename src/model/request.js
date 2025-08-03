
const  mongoose =require("mongoose")

 const connectrequest= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId
    },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId
  },
  Status:{
    type:String,
    enum:{
        values:["ignore","interested","accepted","rejected"],
        message:`{VALUE} is incorrect status`
        
    }
  }
 })
