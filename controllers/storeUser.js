const User = require('../models/Accounts');
const path = require('path')

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/uploads',image.name), async (error) => {
        await User.create({
            ...req.body,
            image: '/uploads/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/')
    })
}