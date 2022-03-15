const mongoose = require("mongoose");

const connect = () =>{

    return mongoose.connect("mongodb+srv://raushan:singh123@cluster0.nryg8.mongodb.net/validation?authSource=admin&replicaSet=atlas-6cf7dp-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true");

};

module.exports = connect;