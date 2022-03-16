const app =  require("./index");

const connect = require("./config/db");

app.listen(3222,async () =>{

    try{
        await connect();
        console.log("Listening on port 3222...")

    }catch(error){
        return console.error(error.message);
    }
})