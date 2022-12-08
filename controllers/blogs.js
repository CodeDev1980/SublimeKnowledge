const BlogPost = require('../models/Blogs');

module.exports = async (req, res)=>{
    const blogs = await BlogPost.find({}).limit(20).sort({_id: -1});
    res.render('blogs', {
        blogs
    })
}