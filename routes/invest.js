const express = require('express');
const userModel = require('../models/users');
const route = express.Router();
const request = require('request');
const cheerio = require('cheerio');



route.get('/', (req, res) => {
    res.render('invest',
        {
            balance: req.session.user.balance,
            fname: req.session.user.fname,
            lname: req.session.user.lname
        });
})
route.get('/apple', (req, res) => {
    res.render('apple', {
        balance: req.session.user.balance,
        fname: req.session.user.fname,
        lname: req.session.user.lname
    });
})

route.post('/apple', (req, res) => {
    request('https://markets.businessinsider.com/stocks/aapl-stock', function (error, response, body) {
        const $ = cheerio.load(body);
        appleQuote = $(".price-section__current-value").text() * 1;
        let action = req.body.action;
        let actionAmount = req.body["invest-apple"] * 1;
        let actionShare = 0;
        if (action === 'buy') {
            actionShare = actionAmount / appleQuote;
            req.session.user.balance -= actionAmount;
            // do it in the database as well
            // add actionShare to the database
            // render or redirect
        } else if (action === 'sell') {
            actionShare = actionAmount / appleQuote;
            req.session.user.balance += actionAmount;
            // do it in the database as well
            // add actionShare to the database
            // render or redirect
        } else {
            console.log('action is undefined')
        }
        res.send('apple' + appleQuote);
    })
})




route.get('/microsoft', (req, res) => {
    res.render('microsoft');
})
route.get('/ibm', (req, res) => {
    res.render('ibm');
})
route.get('/xerox', (req, res) => {
    res.render('xerox');
})
route.get('/dxc', (req, res) => {
    res.render('dxc');
})




module.exports = route;