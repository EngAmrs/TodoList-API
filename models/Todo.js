const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({

    title:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        trim: true
    },
    status:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
        default: "to-do",
        required: true,
        enum : ['done','to-do', 'in-progress'],
    },
    tags:[{
        type: String,
        maxLength: 10
    
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true
});


function validateTodo(todo){

    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        status: Joi.string().min(2).max(30).required(),

    })
    return schema.validate(todo)
}

const Todo = mongoose.model('Todo', todoSchema);

exports.Todo = Todo;
exports.validate = validateTodo;


