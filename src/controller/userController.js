const express = require("express");

const User = require("../models/userModel");

//  middleware 

const uploadFile = require("../middleWare/uploadFile")

const router = express.Router();

router.get("", async(req,res)=>{

    try{
        const users = await User.find().lean().exec();

        return res.status(201).send({users :users})

    }catch(error){
        return res.status(404).send({message: error.message})
    }
});

router.post("",uploadFile.single("profilePic"),async (req,res)=>{

    try{
        const user = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            profilePic : req.file.path,
        })

        return res.status(200).send({user:user});

    }catch(error){
        return res.status(500).send({message: error.message});
    }
})

module.exports = router;