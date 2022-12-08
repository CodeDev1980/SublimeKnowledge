const Blogs = require('../models/Blogs')
const Register = require('../models/Register')

module.exports = async (req, res) => {
    const blogs = await Blogs.find({}).limit(1).sort({_id: -1})
    const register = await Register.find({}).limit().sort({_id: -1})
    res.render('panel', {
        blogs, register
    })
}