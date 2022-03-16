const express = require("express");

const Gallery =require("../models/usergalleryModel");

// middleWare

const fileUpload = require("../middleWare/uploadFile");

const router = express.Router();

router.post("/multiples", fileUpload.any("profilePic"),async(req,res)=>{

    try{
        const filePaths = req.files.map((file)=>{
            return file.path;
        })
        const gallery = await Gallery.create({
            userId:req.body.userId,
            profilePic:filePaths,
        });
        return res.status(201).send({gallery: gallery});

    }catch(error){
        return res.status(404).send({message:error.message});
    }
})



module.exports = router;