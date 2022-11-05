const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description:{type: String},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    state: {
        type: String,
        required: true,
        enum: ['draft', 'published'], 
        default: 'draft'
    },
    read_count: {type: Number, default: 0},
    reading_time: {type: Object},
    tags: {type: String},
    body: {type: String, required: true}
}, {timestamps: true})


const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;