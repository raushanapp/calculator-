
const app = require("./index");

const connect = require("./configs/db");


app.listen(4000,async () =>{

    try{
        await connect();

    }catch(e){
        console.log("something went wrong to the server",e)
    }
    console.log("Listening on port 4000................................");

})