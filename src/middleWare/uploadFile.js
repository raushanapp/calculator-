const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req ,file, callback) =>{
       callback(null, path.join(__dirname,"../myFileUpload"));
    },
    fileName :(req,file,callback) =>{

        const uniqueprefix = Date.now();
        callback(null, uniqueprefix + "-" + file.originalname); 
    },
});

const fileFilter = (req,file,callback) =>{

    if (file.mimetype == "image/jpeg" || file.mimetype=="image/png") {
        callback(null,true);
    }
    else {
        callback(new Error("Incorrect mine type"),false);
    }
};

const options = {
    storage,
    fileFilter,
    limits :{
        fileSize:1024*1024*5
    }
};

const upload = multer(options);

module.exports= upload;