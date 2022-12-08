const Register = require('../models/Register');
const path = require("path");

module.exports = (req, res)=>{
    Register.create(req.body, (error, blogs) => {
        res.redirect('thankyou')
    })
}
