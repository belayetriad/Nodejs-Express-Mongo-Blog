const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category"
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


module.exports = categorySchema;