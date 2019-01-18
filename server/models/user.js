const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 30
    },    
    lastname: {
        type: String,
        required: true,
        maxlength: 30
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    imageID: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
    role:{
        type: Number,
        default: 0  //admin or not
    },
    token:{
        type: String
    }
})

userSchema.pre('save', function(next){
    var user = this  //"this" inside of a pre-save hook is the document that is about to be saved

    if (user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(enteredPassword,cb) {
    var user = this

    bcrypt.compare(enteredPassword, user.password, function(err, didItMatch){
        if(err) return cb(err)
        cb(null, didItMatch)
    })
}

userSchema.methods.generateTheAwyis = function(cb){
    var user = this

    var token = jwt.sign(user._id.toHexString(),process.env.TOKEN)
    user.token = token
    user.save((err,user)=> {
        if (err) return cb(err)
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this

    jwt.verify(token, process.env.TOKEN, function(err, decoded){
        //"decoded" is based on token = jwt.sign(user._id.toHexString(),process.env.TOKEN)
        //"decoded" is the original payload(user._id) without the privateKey(process.env.TOKEN)
        user.findOne({'_id': decoded, 'token':token}, function(err, user){
            if (err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema, 'users')//convert the schema to a model --- mongoose.model(modelName, schema)
module.exports = {User}
