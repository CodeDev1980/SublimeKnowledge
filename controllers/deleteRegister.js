const Register = require('../models/Register')

module.exports = function(req, res, next) {
    Register.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/panel');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
}