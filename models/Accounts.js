const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    about: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: {
        type: String
    },
    username: {
        unique: true,
        type: String,
        required: true
    },
    memberSince: {
        type: Date,
        default: new Date()
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

const user = mongoose.model('User', UserSchema);
module.exports = user;