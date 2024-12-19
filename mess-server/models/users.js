const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    user_name:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
        
    },
})
;


module.exports=mongoose.model("users",userSchema)