const Blog = require('../models/Blogs')

module.exports = async (req, res) => {
    const post = await Blog.findById(req.params.id)
    res.render('singlePost', {
        post
    })
}