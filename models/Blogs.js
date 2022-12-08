const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogsSchema = new Schema ({
    title: {
        type: String,
        unique: true
    },
    message: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
})

const Blogs = mongoose.model('BlogsSchema', BlogsSchema)
module.exports = Blogs