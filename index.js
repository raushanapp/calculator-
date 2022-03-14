
const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());   // this line require when crateing the body or post 


const connect = ()=>{
    return mongoose.connect(
        // mongodb://localhost:27017/
        "mongodb+srv://raushan:singh123@cluster0.nryg8.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-6cf7dp-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"

        // "mongodb://localhost:27017/testData"
        
    );
};

/* ************************************************user schema model start */
const userSchema = new mongoose.Schema(
    {
     firstName :{type:String, required:true},
     lastName:{type:String, required:true},
     gender:{type:String, required:true},
     dateOfBirth:{type:Date, required:true},
     type:{type:String, required:true},
    },
    {
      timestamps:true,      //updatedAt and cereateAt
      versionKey:false,
    }
  );
  
  //  createing the model
  const User = mongoose.model("user", userSchema);
/*  ************************************************user schema  model end*/

// crud operations start

app.get("/users", async (req, res) => {
    try{
       const users = await User.find().lean().exec();
       return res.status(201).send({users:users});
    }
    catch(error){
        return res.status(404).send({message: error.message});
    }

});

app.post ("/users",  async (req,res)=> {

    try{
        const user = await User.create(req.body)
  
        return res.status(201).send({user:user});
  
    }
    catch(err){
        return res.status(404).send({message: err.message});
    }
  
});
// crud operations start


/*  ************************************************  student schema and model start */
const studentSchema = new mongoose.Schema(
    {
        rollId :{type:Number, required:true},
        currentBatch:{type:String, required:true},
    },

    {
        timestamps:true,
        versionKey:false
    }
);

//  create model

const Student = mongoose.model("student", studentSchema);

// moduele.exports = Student;
/*  ************************************************  student schema and model end*/

// strudent crud operations start
app.get("/students", async (req, res) => {
    try{
       const students = await Student.find().lean().exec();
       return res.status(201).send({students:students});
    }
    catch(error){
        return res.status(404).send({message: error.message});
    }

});

app.post ("/students",  async (req,res)=> {

    try{
        const student = await Student.create(req.body)
  
        return res.status(201).send({student:student});
  
    }
    catch(err){
        return res.status(404).send({message: err.message});
    }
  
});
// strudent crud operations end

/* ************************************************ batch schema start and model */


/* Batch :- has fields like Batch name, createdAt, updatedAt*/

// create by schema 

const batchSchema = new mongoose.Schema (
    {
        batchName:{type:String, required:true},
    },

    {
        timestamps:true,
        versionKey:false,
    }
); 


const Batch = mongoose.model("batch", batchSchema);

// module.exports = Batch;

/* ************************************************ batch schema end and model  */
   app.post("/batches", async (req, res) => {
       
    try{
        const batch = await Batch.create(req.body);
  
        return res.status(201).send({batch:batch});
  
    }
    catch(err){
        return res.status(404).send({message: err.message});
    }

   })
/*  ****************************** evaluation schema and model start */


// create schema 

const evaluationSchema = new mongoose.Schema(
    {
        date : {type:String,required:true},
        userId :{type:mongoose.Schema.Types.ObjectId,ref:"user", required :true},
        batchId :{type:mongoose.Schema.Types.ObjectId,ref:"batch", required :true},
        // studentId :{type:mongoose.Schema.Types.ObjectId, required:true,ref:"student"},

        
    },
    {
       timestamps:true,
       versionKey:false,
    }
);


// create model 

const Evaluation = mongoose.model("evaluation",evaluationSchema);


/*  ****************************** evaluation schema and model end*/

// crud operatioons
app.get("/evaluations", async (req, res) => {
    try{
     const evaluation = await Evaluation.find().populate({path:"userId", select :{"type":1,"firstName":1}})
     .populate({path : "batchId", select:{"batchName":1}})
     .lean()
     .exec();
     //  .populate({path : "studentId", select:{"currentBatch":1}})

     return res.status(201).send({evaluation:evaluation});
    }
    catch(err){
        return res.status(404).send({message: err.message})
    }

});

app.post("/evaluations", async (req, res) => {
       
    try{
        const evaluation = await Evaluation.create(req.body);
  
        return res.status(201).send({evaluation:evaluation});
  
    }
    catch(err){
        return res.status(404).send({message: err.message});
    }

   })

/*  ******************************** submission start schema and end */ 

const  subSchema = new mongoose.Schema(
    {
        evaluationId :{type:mongoose.Schema.Types.ObjectId,ref:"evaluation",required:true},
        studentId  :{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
        marks:{type:Number,required:true},
    },
    {
        timestamps:true,
        versionKey:false,
    }
);

const Submission = mongoose.model("submission",subSchema);

/*  ******************************** submission start schema and end */ 

// crud opreationa

app.post("/submissions", async (req, res) => {
       
    try{
        const submission= await Submission.create(req.body);
  
        return res.status(201).send({submission: submission});
  
    }
    catch(err){
        return res.status(404).send({message: err.message});
    }

   })
app.listen(6000, async ()=>{

    try{

        await connect();

    }
    catch(err){
        console.log("Someting went wrong sever side", err);
    }

    console.log("Listening on port 6000...");
});