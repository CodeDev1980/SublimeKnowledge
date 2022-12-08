const Blogs = require('../models/Blogs')

module.exports = function(req, res, next) {
    Blogs.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/blogs');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
}