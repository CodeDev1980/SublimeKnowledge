const Blogs = require('../models/Blogs');
const path = require("path");

module.exports = (req, res)=>{
    Blogs.create(req.body, (error, blogs) => {
        res.redirect('/blogs')
    })
}
