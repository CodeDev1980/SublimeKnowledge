const BlogPost = require('../models/Blogs')

module.exports = async (req, res) => {
    const blogs = await BlogPost.find({}).limit(1).sort({_id: -1})
    console.log(req.session)
    res.render('create', {
        blogs
    })
}