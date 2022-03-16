const mongoose = require("mongoose");
// create schema user 

const userSchema = new mongoose.Schema(
    {
        firstName :{type:String, required:true},
        lastName :{type:String, required:true},
        profilePic :{type:String, required:false},
    },
    {
        timestamps:true,
        versionKey:false,
    }
);

module.exports = mongoose.model("user",userSchema);