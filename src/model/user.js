const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")


const userSchema = new mongoose.Schema(
  
  {
  firstName: {
    type: String,
    required:true,
  },
  LastName: {
    type: String,
  },
  email: {
     type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email ID: " + value);
      }
    }
  },
  password: {
    type: String,
    requires:true,
    trim:true,
     validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("please strong password length 8  : " + value);
      }
    }
  
      },
  age: {
    type: string,
    enum:["male","female","other"],
    message:`{VALUE}  is not a gender types`,
  },
  gender: {
    type: String,
  },
  photurl: {
    type: String,
    default:"https://imgs.search.brave.com/eut7FrXlDo2vX5pEuTh8WmmpWp4hdAlCzfzCbSNjvMA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2I2L0lt/YWdlX2NyZWF0ZWRf/d2l0aF9hX21vYmls/ZV9waG9uZS5wbmcv/OTYwcHgtSW1hZ2Vf/Y3JlYXRlZF93aXRo/X2FfbW9iaWxlX3Bo/b25lLnBuZw"
  },
  about: {
    type: String,
    default:"defauly message "
  },
  skills: {
    type: [String],
  },
  
 
  },
  {
    timestamps:true,
  }
);




userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
};


userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "maksud@122#789");
  return token;
};



module.exports=mongoose.model("user",userSchema)
