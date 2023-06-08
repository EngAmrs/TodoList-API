const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');
const {validateTodo} = require('../middlewares/todoValidation')
const userAuth = require('../middlewares/auth');



router.post('/',userAuth, async (req, res, next) =>{
    try{
        const { error } = validateTodo(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        const {body: {title, tags}} = req;
        const user = req.user._id;
        const todo = await todosController.create({user, title, tags});
        //res.status(200);
        return res.json(todo)

    }catch(err){
        return res.status(400).json({message: err.message});
    }
});

router.patch('/:id', userAuth, async (req, res, next) =>{
    try{
        const { error } = validateTodo(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const {body: {title, status}} = req;
        const userId = req.user._id; 
        if (!req.user.admin){
            if (!userId) return res.sendStatus(401)
        } 
        const { params: { id } } = req;
        const editToDo = await todosController.edit(userId, id, title, status);
        //res.status(200);
        return res.json(editToDo)
    }catch(err){
        return res.status(400).json({message: err.message});
      }
})

router.delete('/:id', userAuth, async (req, res, next) =>{
    try{
        const {params: {id}} = req;
        const userId = req.user._id; 
        if (!req.user.admin){
            if (!userId) return res.sendStatus(401)
        } 

        const delToDo = await todosController.del(userId, id);
        return res.json({msg: "Doc deleted successfully", delToDo : delToDo});
    }catch(err){
        res.status(400).send(err.message);
    }
    

})

router.get('/', userAuth, async (req, res, next) =>{

    try{
        const {query: {limit, skip, status}} = req;
        console.log(limit, skip, status)
        const userId = req.user._id; 
        if (!req.user.admin){
            if (!userId) return res.sendStatus(401)
        } 

        const data = await todosController.getData(userId, limit, skip, status);
        res.json(data);
       
    }catch(err){
        res.status(400).send(err.message);
    }
    
})


module.exports = router;