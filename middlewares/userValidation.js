const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const {User} = require('../models/User');

function validateUser(user){

    const complexityOptions = {
       min: 8,
       max: 255,
       lowerCase: 1,
       upperCase: 1,
       numeric: 1,
       symbol: 1,
     };

   const schema = Joi.object({
       username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).min(5).max(30).required(),
       firstName: Joi.string().min(2).max(30).required(),
       lastName: Joi.string().min(2).max(30).required(),
       email: Joi.string().min(5).max(255).required().email(),
       password: passwordComplexity(complexityOptions)
   })
   return schema.validate(user)
}


const checkEmail = ( async (req, res, next)=>{
    //Validate inputs
    try{
        const user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).json({message: "This email is already registered!"});
    }catch(err){
        return res.status(400).json({message: err.message})
    }
    next();
})

module.exports = {
    validateUser,
    checkEmail
  };