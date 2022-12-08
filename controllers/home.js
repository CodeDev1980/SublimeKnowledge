
const Reviews = require('../models/Review')
const Blogs = require('../models/Blogs')

module.exports = async (req, res) => {
    const reviews = await Reviews.find({}).limit(3).sort({_id: -1})
    const blogpost = await Blogs.find({}).limit(1).sort({_id: -1})
    res.render('index', {
        reviews, blogpost
    })
}