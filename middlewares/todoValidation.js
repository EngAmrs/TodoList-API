
const Joi = require('joi');


function validateTodo(todo){
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        status: Joi.string().min(2).max(30),

    })
    return schema.validate(todo)
}


exports.validateTodo = validateTodo;


