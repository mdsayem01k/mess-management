const mongoose= require('mongoose')



const tokenSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'users'
    },
    token:{
        type:String,
        required:true,
    },
    expireAt:{
        type:Date,
        required:true,
    }
})


tokenSchema.index({expireAt:1},{expireAfterSeconds:0})


module.exports=mongoose.model("users_token",tokenSchema)