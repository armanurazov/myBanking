const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('signUp');
})

route.post('/', (req, res) => {

    let fname = req.body["sign-up-fname"];
    let lname = req.body["sign-up-lname"];
    let email = req.body["sign-up-email"];
    let password = req.body["sign-up-password"];
    let occupation = req.body["sign-up-occupation"];
    let dateOfBirth = req.body["sign-up-date-of-birth"];
    let address = req.body["sign-up-address"];
    let postalCode = req.body["sign-up-postal-code"];
    let city = req.body["sign-up-city"];
    let province = req.body["sign-up-province"];
    let country = req.body["sign-up-country"];
    let cellNumber = req.body["sign-up-cell-number"];
    let prefComm = req.body["sign-up-preferred-comm"];

    res.send('Hello Mr. ' + lname)
})

module.exports = route;