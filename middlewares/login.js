const usersController = require('../controllers/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Decode passwd
const isMatched= async (enteredPassword, password) => bcrypt.compare(enteredPassword, password);

// generate token
const JWTSecret = process.env.JWT_SECRET || "Lab5";
const generateJWT = (payload) => jwt.sign(payload, JWTSecret, { expiresIn: '7d' });

/* User login */
const userLogin = async (req, res) => {
    try{
    const { email, password } = req.body;
    const user = await usersController.getUser(email); 
    if (!user) return res.status(404).json({message: "User not found"});
     
    console.log(password, user.password);
    const compare = await isMatched(password, user.password);
    if (!compare) return res.status(401).json({message: "Password is incorrect"});


    // send user a token
      const token = generateJWT({ id: user.id });
      res.status(200).json({ token });
    }catch(err){
        return res.json({message: err.message})
    }
  };

  module.exports = userLogin