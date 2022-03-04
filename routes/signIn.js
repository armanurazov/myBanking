const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const userModel = require('../models/users');

var userEmail = 'not assigned';


route.get('/', (req, res) => {
    res.render('signIn');
})

route.post('/', (req, res) => {
    let email = req.body["sign-in-email"];
    let password = req.body["sign-in-password"];

    let errorMessage = '';

    userModel.findOne({ 'email': email }, 'email password balance', function (err, user) {
        if (err) return handleError(err);
        if (email == user.email) {
            if (bcrypt.compareSync(password, user.password)) {   // function returns true if password matched the database hashed password
                req.session.user = user.email;
                //res.render('dashboard', { email: user.email , balance: user.balance});
                res.redirect('dashboard');
                
                console.log(req.session)
            } else {
                errorMessage = 'Invalid password'
                res.render('home', { errorMessage: errorMessage });
            };
        } else {
            errorMessage = 'User Not Found'
            res.render('home', { errorMessage: errorMessage });
        }
    });
})

    module.exports = {route, userEmail};


