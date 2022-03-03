const express = require('express')
// console.log(express);

const app = express()
// console.log(app)

app.get('/student', (req,res) =>{

    // console.log('hello students')
    res.send('hello students ')
    // console.log('method', req.method)
} )
app.get('/user',(req,res)=>{
   res.send({name:'raushan'})
})
app.get('/books', (req, res)=>{
   const data = {
       name :'postive Thinking',
       name1 :'postive Thinking1',
       name2 :'postive Thinking2',
       name3 :'postive Thinking3',
   };
   res.send(data)
//    res.send(JSON.stringify(data))
})

app.listen(3000, () =>{
    // console.log('listing on 3000 app')
})