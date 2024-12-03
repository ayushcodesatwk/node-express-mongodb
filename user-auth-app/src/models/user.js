const mongoose = require('mongoose');

//always use new keyword, Schema is a class
const UserLoginSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timeStamps: true});


const User = mongoose.model('auth-db', UserLoginSchema);
module.exports = { User };