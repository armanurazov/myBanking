const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const userModel = require('../models/users');

route.get('/', (req, res) => {
    res.render('signIn');
})

route.post('/', (req, res) => {
    let email = req.body["sign-in-email"];
    let password = req.body["sign-in-password"];

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body["sign-in-password"], salt);  // password hashing 

    let errorMessage = '';

    userModel.findOne({ 'email': email }, 'email password', function (err, user) {
        if (err) return handleError(err);
        if (email == user.email) {
            if (bcrypt.compareSync(password, user.password)) {       // function returns true if password matched the database hashed password
                res.render('dashboard', { email: email}) 
            } else {
                //console.log(hash);
                errorMessage = 'Invalid password'
                res.render('home', { errorMessage: errorMessage });
            };
        } else {
            errorMessage = 'User Not Found'
            res.render('home', { errorMessage: errorMessage });
        }
    });
})

module.exports = route;