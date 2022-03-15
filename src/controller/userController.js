
const express = require("express");

const {body, validationResult} = require("express-validator");

const User = require("../models/userModel");

const router = express.Router();


router.post("/",body("firstName")
  .trim()
  .not()
  .isEmpty()
  .withMessage("Name should be required"),
  body("email")
  .isEmail()
  .custom(async (value)=>{

    const user = await User.findOne({ email: value});
    if (user){
        throw new  Error ("email is already in use");
    }
    return true;
  }),
  body("age")
  .not()
  .isEmpty()
  .withMessage("Age can not empty")
  .isNumeric()
  .withMessage("number should 1 to 100")
  .custom((val)=>{
      if (val<1||val>100){
          throw new Error("please provid the correct age")
       }
       return true
  }),
  body("pincode")
  .not()
  .isEmpty()
  .isNumeric()
  .isLength({min:6, max:6})
  .withMessage("please enter correct pincode")
  ,async(req,res) =>{

    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(404).send({errors:errors.array()});
        }


        const user = await User.create(req.body);
        return res.status(201).send({user:user});

    }catch(err){
        return res.status(404).send({message:err.message});
    }
});

module.exports = router;