const Reviews = require('../models/Review');
const path = require("path");

module.exports = (req, res)=>{
    Reviews.create(req.body, (error, reviews) => {
        res.redirect('/')
    })
}
