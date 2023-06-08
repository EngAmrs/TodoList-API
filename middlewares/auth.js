const jwt = require('jsonwebtoken');
const {User} = require('../models/User');

const JWTSecret = process.env.JWT_SECRET || "Lab5";

// Check if user
const userAuth = async (req, res, next) => {
    try{
        const authHeader = req.headers.token;
        if (!authHeader) return res.sendStatus(401)
        const payload = jwt.verify(authHeader, JWTSecret);
        const user = await User.findById(payload.id);
        if (!user) return res.status(404).json({message: "User is not found"});
        
        req.user = user; 
        return next();
    } catch(err){
        return res.json({message: err.message});
    }
  };
module.exports = userAuth;