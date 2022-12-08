const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RegisterSchema = new Schema ({
    name: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    message: {
      type: String
    },
    datePosted: {
      type: Date,
      default: new Date()
    }
})

const Register = mongoose.model('Register', RegisterSchema)
module.exports = Register