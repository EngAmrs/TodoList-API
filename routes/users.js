const express = require('express');
const router = express.Router();
const {validateUser, checkEmail} = require('../middlewares/userValidation')
const { todosController ,usersController } = require('../controllers');
const userAuth = require('../middlewares/auth');


// Regiser
router.post('/', checkEmail, async (req, res, next)=>{
    try{
        
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const {body: {username, firstName, lastName, email, password}} = req;
        await usersController.create({username, firstName, lastName, email, password})

        res.json("Registered successfully");
    }catch(err){
        return res.status(400).json({message: err.message})

    } 
});


// Get users
router.get('/', async (req, res, next)=>{
    try{
        const users = await usersController.getData()   
        if(!users) res.status(404).json({message: "No users found"});
        res.status(200).json(users);
    }catch(err){
        return res.status(400).json({message: err.message})
    } 
});

// delete user
router.delete('/:id', userAuth, async (req, res, next)=>{
    try {
        const userId = req.params.id;
        await usersController.deletedUser(userId)   
        res.status(200).send({message:"User is deleted successfully"})             
    } catch (err) {
        return res.status(400).json({message: err.message})            
    }
})

//Edit user
router.patch('/:id', userAuth, async (req, res, next)=>{
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const userId = req.params.id;
        if(userId != req.user._id){ 
            res.sendStatus(401)
        }
        const {firstName, lastName, email } = req.body;
        await usersController.editUser(userId, firstName, lastName, email)   
           return res.status(200).json({message:"User is updated successfully"})               
    } catch (err) {            
        return res.status(400).json({message: err.message})            

    }
})

//get user
router.get('/:id', userAuth, async (req, res, next)=>{
    try {
        const userId = req.params.id;
        if(userId != req.user._id){ 
            res.sendStatus(401)
        }
        const user = await usersController.getOneUser(userId)
           return res.status(200).json(user)               
    } catch (err) {            
        return res.status(400).json({message: err.message})            

    }
})


// get user todos
router.get('/:id/todos', userAuth, async (req, res, next)=>{
    try {
        const userId = req.params.id;
        const {query: {limit, skip, status}} = req;
        if (!userId) return res.sendStatus(401)
        const data = await todosController.getData(userId, limit, skip, status);
        res.json(data);          
    } catch (err) {
        return res.status(400).json({message: err.message})            
    }
})




module.exports = router;