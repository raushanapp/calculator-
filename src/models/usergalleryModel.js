const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
    {
        userId :{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
        profilePic :{type:String,required:false},
    },
    {
        timestamps:true,
        versionKey:false,
    }
);

module.exports = mongoose.model("gallery",gallerySchema);