const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    status: {
        type: String,
        enum: ['published', 'draft', 'hold'],
        default: 'published'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})


module.exports = postSchema;