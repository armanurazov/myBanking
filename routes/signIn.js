const express = require('express');
const route = express.Router();
const userModel = require('../models/users');

route.get('/', (req, res) => {
    res.render('signIn');
})

route.post('/', (req, res) => {
    let email = req.body["sign-in-email"];
    let password = req.body["sign-in-password"];

    let errorMessage = 'User Not Found'

    userModel.findOne({ 'email': email }, 'email lname address', function (err, user) {
        if (err) return handleError(err);
        if(email==user.email){
            res.render('dashboard', { email: email, address: user.address}) // add password validation
        }else{
            res.render('home', { errorMessage: errorMessage });
        }
    });

    // function isFound() {
    //     if (email == emailFromDB)
    //         {return true;}
    //     return false;
    // }
    // if (isFound()) {
    //     res.render('dashboard', { email: email })
    // } else {
    //     res.render('home', { errorMessage: errorMessage });
    // }
})

module.exports = route;