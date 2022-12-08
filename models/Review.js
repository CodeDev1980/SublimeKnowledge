const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReviewSchema = new Schema ({
    title: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    Product: {
        type: String,
        required: true
    },
    yourName: String
})

const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review