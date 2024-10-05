const mongoose=require("mongoose")
 const zod=require("zod")

mongoose.connect("mongodb+srv://vinay310:qxW1W5PXmxbq8A5W@cluster0.oo17tou.mongodb.net/paytm")

const user=new mongoose.Schema({
   firstname:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minLength:3,
    maxLength:30,
   }
})

const User=mongoose.model("User",user)

module.exports={User}