const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');

const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true, //validator
        minlength: 2, // minimum length
        trim: true //trim string
    },
    email: {
        type: String,
        required: true, //validator
        minlength: 2, // minimum length
        trim: true, //trim string
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true
    },
    apiKey:String,
    googleId:String,
})

/**
 * convert password to string
 * */

UserSchema.pre('save',function (next){
    console.log('start save');

    var user=this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
           bcrypt.hash(user.password,salt,(err,hash)=>{
               user.password=hash;

               // genrate api key
               bcrypt.genSalt(10,(err,salt)=>{
                   bcrypt.hash(Date.now().toString(),salt,(err,hash)=>{
                       user.apiKey=hash
                       next()
                   });
               });
           });
        });
    }else{
        next();
    }
});

const User = mongoose.model('Users', UserSchema);

module.exports = { User };