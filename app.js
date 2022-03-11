const express = require("express");

const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connectDB = () => {

    // return mongoose.connect("mongodb+srv://sraushan:Workdone@cluster0.rh2jj.mongodb.net/bookData_15?retryWrites=true&w=majority");
    return mongoose.connect("mongodb://localhost:27017/bookData");

}

// Section  Schema

// step 1 createing the schema

const sectionSchema = new mongoose.Schema({
    nameSection : {type :String, required:true},
    bookId:{type:mongoose.Schema.Types.ObjectId, ref:"book",required:true}

     
},
{
    versionKey:false,
    timestamps:true,
}
);

// // setp -2 creating the   model

const Section = mongoose.model("section", sectionSchema);

// books  schemma 



// step 1 createing the schema

const bookSchema = new mongoose.Schema(
    {
      title:{type:String, required:true},
      body:{type:String, required:true},
      sectionId:{type:mongoose.Schema.Types.ObjectId, ref:"section",required:true}
    },
    
    {
        versionKey:false,
        timestamps:true,
    }
);
// console.log(bookSchema)
// // // setp2 creating the model

const  Store = mongoose.model("book", bookSchema);

// // author schema;
// // step 1

const authorSchema = new mongoose.Schema(
    {
       firstName :{type :String, required: true},
       lastName :{type : String,required:true},
      bookId:{type:mongoose.Schema.Types.ObjectId, ref:"book",required:true}

    },
    {
        versionKey:false,
        timestamps:true,   
    }
)

// //  creating the model

const Author = mongoose.model("author",authorSchema)



//  crud  Sections 
app.get("/sections/:id", async (req,res)=>{
    try{
       const sections = await Section.findById(req.params.id).lean().exec();

       return res.status(200).send({sections :sections});
    }
    catch(error) {
        return res.status(404).send({message :error.message})
    }
})
app.post("/sections", async (req,res)=>{
    try{
       const section = await Section.create(req.body);

       return res.status(201).send({section :section});
    }
    catch(error) {
        return res.status(404).send({message :error.message})
    }
})

app.patch("/sections/:id", async (req, res)=>{
    
   try{
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    .lean()
    .exec();

    return res.status(200).send({section : section})

   }catch(error) {
    return res.status(404).send({message :error.message})
        
   }
})

//  crud book 
app.get("/books/:sectionId", async (req,res)=>{
    try{
       const store = await Store.findById(req.params.sectionId).lean().exec();

       return res.status(200).send({store :store});
    }
    catch(error) {
        return res.status(404).send({message :error.message})
    }
})

app.post("/books", async(req,res)=>{
    try{
        const store = await Store.create(req.body);
 
        return res.status(200).send({store :store});
     }
     catch(error) {
         return res.status(404).send({message :error.message})
     }
})


app.listen(3000, async() =>{

    try{
        await connectDB();
    }
    catch(e) {
        return res.status(404).send({message :error.message})
        
    }
    console.log("Listening on Port 3000")
})