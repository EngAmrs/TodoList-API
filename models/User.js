const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const userSchema = new Schema({

    username:{
        type: String,
        required: true,
        unique:true,
        minLength: 5,
        maxLength: 30
    },
    firstName:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    lastName:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    email:{
        type: String,
        required: true,
        unique:true,
        minLength: 5,
        maxLength: 100
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 1024

    },
    admin:{
        type: Boolean,
        default: false,
        require: true
    }

},
{
    timestamps: true
});




//Hash password
    userSchema.pre('save', function preSave(next){

        this.password =  bcrypt.hashSync(this.password, 10);
        next();
    })
   

const User = mongoose.model('User', userSchema);

exports.User = User;


