const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const config = process.env;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        min: 11,
        max: 11
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    careatedAt: {
        type: Date,
        default: new Date()
    }
})

UserSchema.statics.findByToken = function(token, cb){
    const user = this;

    jwt.verify(token, config.TOKEN_KEY, function(err, decode) { 
        user.findOne({"_id": decode.user_id, "token": token},function (err, user) {
            if(err) return cb(err)
            cb(null, user)
        })

    })
}

UserSchema.method.deleteToken = function(token, cb){
    user = this;

    user.update({$unset: {token: 1}}, function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}


module.exports = UserSchema;