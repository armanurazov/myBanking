const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const userModel = require('../models/users');

route.get('/', (req, res) => {
    res.render('signUp');
})

route.post('/', (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body["sign-up-password"], salt);

    let user1 = new userModel({
        fname: req.body["sign-up-fname"],
        lname: req.body["sign-up-lname"],
        email: req.body["sign-up-email"],
        password: hash,                           // password is stored in db as a hash value
        occupation: req.body["sign-up-occupation"],
        dateOfBirth: req.body["sign-up-date-of-birth"],
        address: req.body["sign-up-address"],
        postalCode: req.body["sign-up-postal-code"],
        city: req.body["sign-up-city"],
        province: req.body["sign-up-province"],
        country: req.body["sign-up-country"],
        cellNumber: req.body["sign-up-cell-number"],   //need to change the type from Number (to String?)
        prefComm: req.body["sign-up-preferred-comm"]
    })

    user1.save()
        .then(console.log('user was saved'))
        .catch(console.error());

    res.send('Hello Mr. ' + req.body["sign-up-lname"])
})

module.exports = route;