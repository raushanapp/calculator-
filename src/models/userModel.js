

// create schema for user 

const mongoose  = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        firstName :{type:String ,required:true},
        lastName :{type:String ,required:true},
        email :{type:String ,required:true,unique:true},
        gender:{type:String,required:true},
        age:{type:Number,required:true, enum:['Male','Female','other']},
        pincode :{type:Number,required:true}
    },
    {
        timestamps:true,
        versionKey:false,
    }
);

const User = mongoose.model("user",userSchema);

module.exports =User;