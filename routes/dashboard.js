const express = require('express');
const userModel = require('../models/users');
const route = express.Router();
const userEmail = require('./signIn')

/***************************** signed in user info ********************************/




route.get('/', (req, res) => {
    res.render('dashboard');
})

route.post('/', (req, res) => {
    let amount = req.body["deposit-amount"]
    console.log(req.session);
    res.render('dashboard', {email: req.session.user, balance: amount});
})


module.exports = route;
