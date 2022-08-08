const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    careatedAt: {
        type: Date,
        default: new Date()
    }
})


module.exports = UserSchema;