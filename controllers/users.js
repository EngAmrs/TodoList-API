const {User} = require('../models/User');

// Register

const create = (data) => {
    if(data.admin === true) return
    
    return User.create(data)

};


// Get users [First Name only]
const getData = () => User.find().select('firstName');


// Get one user by Email [Auth]
const getUser = (email) => User.findOne({email: email});

// Get one user by ID
const getOneUser = (uid) => User.findOne({_id: uid}).select('-password -_id')
// Delete user
const deletedUser = (userId) => User.findByIdAndDelete(userId);

// Edit user
const editUser = (uid, firstName, lastName, email) => User.findOneAndUpdate(
    {_id: uid}, 
    { $set: { firstName, lastName, email} },
    { runValidators: true })

module.exports = {
    create,
    getData,
    deletedUser,
    editUser,
    getUser,
    getOneUser
}