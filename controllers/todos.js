const {Todo} = require('../models/Todo');

// Create
const create = (data) => Todo.create(data);

// get
const getData = (uid, skip, limit, status) => {
    if(limit > 10) limit = 10
    const todos = Todo.find({ user: uid, status }).skip(skip || 0).limit(limit || 10)
    return todos;
  };

//delete todo
const del = (uid, todoid) => Todo.deleteOne({_id: todoid, user: uid});

//Edit todo

const edit = (uid, todoId, title, status)=> 
    Todo.findOneAndUpdate(
        {_id: todoId, user: uid}, 
        { $set: { title: title, status: status} },
        { runValidators: true },
        {new: true})

module.exports = {
    create,
    getData,
    del,
    edit
}