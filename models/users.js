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
    cellNumber: String,
    prefComm: String,
    balance: Number,
    appleShares: Number,
    microsoftShares: Number,
    dxcShares: Number,
    xeroxShares: Number,
    ibmShares: Number
})

const userModel = mongoose.model('User', user);

module.exports = userModel;