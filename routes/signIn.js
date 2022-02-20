const express = require('express');
const route = express.Router();

route.get('/', (req, res) =>{
    res.render('signIn');
})

route.post('/', (req, res) => {
    let email = req.body["sign-in-email"];
    let password = req.body["sign-in-password"];

    let errorMessage = 'User Not Found'

    var users = [];
    var obj = [];

    users.push('{"email": "' + 'armanurazov.inbox@gmail.com' + '"}')
    users.push('{"email": "' + 'armanurazov.inbox@gmail.com' + '"}')
    users.push('{"email": "' + 'armanurazov.inbox@gmail.com' + '"}')

    for (var i = 0; i < users.length; i++) {
        obj[i] = JSON.parse(users[i])
    }
    function isFound() {
        for (var i = 0; i < 3; i++) {
            if (email == obj[i].email) 
            return true;
        }
        return false;
    }
    if (isFound()) {
        res.render('dashboard', { email: email })
    } else {
        res.render('home', { errorMessage: errorMessage });
    }
})

module.exports = route;