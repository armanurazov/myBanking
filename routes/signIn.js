const express = require('express');
const bcrypt = require('bcryptjs');
const route = express.Router();
const userModel = require('../models/users');
// const clientSessions = require("client-sessions");

// route.use(clientSessions({
//     cookieName: "session", // this is the object name that will be added to 'req'
//     secret: "week10example_web322", // this should be a long un-guessable string.
//     duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
//     activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
// }));

route.get('/', (req, res) => {
    res.render('signIn');
})

route.post('/', (req, res) => {
    let email = req.body["sign-in-email"];
    let password = req.body["sign-in-password"];

    let errorMessage = '';

    userModel.findOne({ 'email': email }, 'email password balance address', function (err, user) {
        if (err) return handleError(err);
        if (email == user.email) {
            if (bcrypt.compareSync(password, user.password)) {   // function returns true if password matched the database hashed password
                req.session.user = {
                    email: user.email,
                    balance: user.balance,
                    address: user.address
                };
                res.redirect('/dashboard');
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




module.exports = { route };


