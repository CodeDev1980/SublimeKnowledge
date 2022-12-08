const User = require('../models/Accounts');
const path = require("path");

module.exports = (req, res)=>{
    User.create(req.body, (error, user) => {
        res.redirect('/auth/login')
    })
}
