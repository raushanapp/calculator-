const express = require('express');

const app = express();

const checkBook = (req,res,next) =>{

    req.book = bookName [req.params.name]
    next()
}

bookName  = {
    'name1':"Harry Portter",
    'name2':"Game of Throens",
    'name3':"Postive Thinking",
    'name4':"Power Thinking",
}

app.get('/books/:name', checkBook,(req,res)=>{
    
   
     res.send(req.book)

})





app.listen(2000,()=>{
    console.log(' listening on port 2000')
})