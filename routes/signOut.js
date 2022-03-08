const express = require('express');
const bcrypt = require('bcryptjs');
const route = express.Router();
const userModel = require('../models/users');

route.get('/', (req, res) => {

    res.render('signin', 
    {
        email: '',
        balance: 0,
        fname: '',
        lname: '',
        appleQuote: 0,
        microsQuote: 0,
        ibmQuote: 0,
        dxcQuote: 0,
        xeroxQuote: 0,
        appleShares: 0,
        microsoftShares: 0,
        dxcShares: 0,
        xeroxShares: 0,
        ibmShares: 0
    });
})

module.exports = { route };