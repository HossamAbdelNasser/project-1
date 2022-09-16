const mongo = require('mongoose')
const Schema = mongo.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },

}, {timestamps: true});

const Blog = mongo.model('Blog', blogSchema);
module.exports = Blog;