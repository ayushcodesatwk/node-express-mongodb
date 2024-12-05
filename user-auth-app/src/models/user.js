import mongoose from 'mongoose';

//always use new keyword, Schema is a class
//used third party package validator to make sure it's a valid email otherwise error
//make sure this minlength is in small letters.
const UserLoginSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Mininum length of password should be 6']
    }
}, {timestamps: true});



// fire a function before doc is saved
UserLoginSchema.post('save', function(doc, next){
    console.log('user was created & saved', doc)
    next();
})

// fire a function after doc is saved
UserLoginSchema.pre('save', function(next){
    //this keyword will carry the doc
    console.log('user about to be created', this);
    next();
})

const User = mongoose.model('auth-dbs', UserLoginSchema);

export default User;