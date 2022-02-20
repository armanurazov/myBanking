const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const user = new Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    occupation: String,
    dateOfBirth: Date,
    address: String,
    postalCode: String,
    city: String,
    province: String,
    country: String,
    cellNumber: Number,
    prefComm: String
})

const userModel = mongoose.model('User', user);

module.exports = userModel;