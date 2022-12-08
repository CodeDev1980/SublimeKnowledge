const Reviews = require('../models/Review')

module.exports = async (req, res) => {
    const reviews = await Reviews.find({}).sort({_id: -1})
    console.log(req.session)
    res.render('reviews', {
        reviews
    })
}
