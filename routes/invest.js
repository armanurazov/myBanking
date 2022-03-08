const express = require('express');
const userModel = require('../models/users');
const route = express.Router();
const request = require('request');
const cheerio = require('cheerio');



route.get('/', (req, res) => {
    if (req.session.user == null) {
        let errorMessage = "session expired"
        res.render('home', { errorMessage: errorMessage });
        return;
    }
    res.render('invest',
        {
            email: req.session.user.email,
            balance: req.session.user.balance,
            fname: req.session.user.fname,
            lname: req.session.user.lname,
            appleShares: req.session.user.appleShares,
            microsoftShares: req.session.user.microsoftShares,
            dxcShares: req.session.user.dxcShares,
            xeroxShares: req.session.user.xeroxShares,
            ibmShares: req.session.user.ibmShares
        });
})
route.get('/apple', (req, res) => {
    if (req.session.user == null) {
        let errorMessage = "session expired"
        res.render('home', { errorMessage: errorMessage });
        return;
    }
    res.render('apple', {
        email: req.session.user.email,
        balance: req.session.user.balance,
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        appleShares: req.session.user.appleShares,
        microsoftShares: req.session.user.microsoftShares,
        dxcShares: req.session.user.dxcShares,
        xeroxShares: req.session.user.xeroxShares,
        ibmShares: req.session.user.ibmShares
    });
})

route.post('/apple', (req, res) => {
    request('https://markets.businessinsider.com/stocks/aapl-stock', function (error, response, body) {
        const $ = cheerio.load(body);
        appleQuote = $(".price-section__current-value").text() * 1;
        let action = req.body.action;
        let actionAmount = req.body["invest-apple"] * 1;
        let actionShare = 0;
        let email = req.session.user.email;
        userModel.findOne({ 'email': email }, 'email appleShares', function (err, user){
            req.session.user.appleShares = user.appleShares * 1;
            if (action === 'buy') {
                actionShare = actionAmount / appleQuote;
                req.session.user.balance -= actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            appleShares: req.session.user.appleShares + actionShare,
                            balance: req.session.user.balance 
                        }
                    }
                ).exec();
            } else if (action === 'sell') {
                actionShare = actionAmount / appleQuote;
                req.session.user.balance += actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            appleShares: req.session.user.appleShares - actionShare,
                            balance: req.session.user.balance 
                         }
                    }
                ).exec();console.log('share sold')
            } else {
                console.log('action is undefined')
            }
            res.redirect('/dashboard');
        })

    })
})

route.get('/microsoft', (req, res) => {
    if (req.session.user == null) {
        let errorMessage = "session expired"
        res.render('home', { errorMessage: errorMessage });
        return;
    }
    res.render('microsoft', {
        email: req.session.user.email,
        balance: req.session.user.balance,
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        appleShares: req.session.user.appleShares,
        microsoftShares: req.session.user.microsoftShares,
        dxcShares: req.session.user.dxcShares,
        xeroxShares: req.session.user.xeroxShares,
        ibmShares: req.session.user.ibmShares
    });
})

route.post('/microsoft', (req, res) => {
    request('https://markets.businessinsider.com/stocks/msft-stock', function (error, response, body) {
        const $ = cheerio.load(body);
        microsoftQuote = $(".price-section__current-value").text() * 1;
        let action = req.body.action;
        let actionAmount = req.body["invest-microsoft"] * 1;
        let actionShare = 0;
        let email = req.session.user.email;
        userModel.findOne({ 'email': email }, 'email microsoftShares', function (err, user){
            if(req.session.user.microsoftShares)
            {
                req.session.user.microsoftShares = user.microsoftShares * 1;
            }else{
                req.session.user.microsoftShares = 0;
            }
            if (action === 'buy') {
                actionShare = actionAmount / microsoftQuote;
                req.session.user.balance -= actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            microsoftShares: req.session.user.microsoftShares + actionShare,
                            balance: req.session.user.balance 
                        }
                    }
                ).exec();
            } else if (action === 'sell') {
                actionShare = actionAmount / microsoftQuote;
                req.session.user.balance += actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            microsoftShares: req.session.user.microsoftShares - actionShare,
                            balance: req.session.user.balance 
                         }
                    }
                ).exec();console.log('share sold')
            } else {
                console.log('action is undefined')
            }
            res.redirect('/dashboard');
        })

    })
})




route.get('/ibm', (req, res) => {
    if (req.session.user == null) {
        let errorMessage = "session expired"
        res.render('home', { errorMessage: errorMessage });
        return;
    }
    res.render('ibm', {
        email: req.session.user.email,
        balance: req.session.user.balance,
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        appleShares: req.session.user.appleShares,
        microsoftShares: req.session.user.microsoftShares,
        dxcShares: req.session.user.dxcShares,
        xeroxShares: req.session.user.xeroxShares,
        ibmShares: req.session.user.ibmShares
    });
})

route.post('/ibm', (req, res) => {
    request('https://markets.businessinsider.com/stocks/ibm-stock', function (error, response, body) {
        const $ = cheerio.load(body);
        ibmQuote = $(".price-section__current-value").text() * 1;
        let action = req.body.action;
        let actionAmount = req.body["invest-ibm"] * 1;
        let actionShare = 0;
        let email = req.session.user.email;
        userModel.findOne({ 'email': email }, 'email ibmShares', function (err, user){
            req.session.user.microsoftShares = user.ibmShares * 1;
            if (action === 'buy') {
                actionShare = actionAmount / ibmQuote;
                req.session.user.balance -= actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            ibmShares: req.session.user.ibmShares + actionShare,
                            balance: req.session.user.balance 
                        }
                    }
                ).exec();
            } else if (action === 'sell') {
                actionShare = actionAmount / ibmQuote;
                req.session.user.balance += actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            ibmShares: req.session.user.ibmShares - actionShare,
                            balance: req.session.user.balance 
                         }
                    }
                ).exec();console.log('share sold')
            } else {
                console.log('action is undefined')
            }
            res.redirect('/dashboard');
        })

    })
})

route.get('/xerox', (req, res) => {
    if (req.session.user == null) {
        let errorMessage = "session expired"
        res.render('home', { errorMessage: errorMessage });
        return;
    }
    res.render('xerox', {
        email: req.session.user.email,
        balance: req.session.user.balance,
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        appleShares: req.session.user.appleShares,
        microsoftShares: req.session.user.microsoftShares,
        dxcShares: req.session.user.dxcShares,
        xeroxShares: req.session.user.xeroxShares,
        ibmShares: req.session.user.ibmShares
    });
})

route.post('/xerox', (req, res) => {
    request('https://markets.businessinsider.com/stocks/xrx-stock', function (error, response, body) {
        const $ = cheerio.load(body);
        xeroxQuote = $(".price-section__current-value").text() * 1;
        let action = req.body.action;
        let actionAmount = req.body["invest-xerox"] * 1;
        let actionShare = 0;
        let email = req.session.user.email;
        userModel.findOne({ 'email': email }, 'email xeroxShares', function (err, user){
            req.session.user.xeroxShares = user.xeroxShares * 1;
            if (action === 'buy') {
                actionShare = actionAmount / xeroxQuote;
                req.session.user.balance -= actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            xeroxShares: req.session.user.xeroxShares + actionShare,
                            balance: req.session.user.balance 
                        }
                    }
                ).exec();
            } else if (action === 'sell') {
                actionShare = actionAmount / xeroxQuote;
                req.session.user.balance += actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            xeroxShares: req.session.user.xeroxShares - actionShare,
                            balance: req.session.user.balance 
                         }
                    }
                ).exec();console.log('share sold')
            } else {
                console.log('action is undefined')
            }
            res.redirect('/dashboard');
        })

    })
})

route.get('/dxc', (req, res) => {
    if (req.session.user == null) {
        let errorMessage = "session expired"
        res.render('home', { errorMessage: errorMessage });
        return;
    }
    res.render('dxc', {
        email: req.session.user.email,
        balance: req.session.user.balance,
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        appleShares: req.session.user.appleShares,
        microsoftShares: req.session.user.microsoftShares,
        dxcShares: req.session.user.dxcShares,
        xeroxShares: req.session.user.xeroxShares,
        ibmShares: req.session.user.ibmShares
    });
})

route.post('/dxc', (req, res) => {
    request('https://markets.businessinsider.com/stocks/dxc-stock', function (error, response, body) {
        const $ = cheerio.load(body);
        dxcQuote = $(".price-section__current-value").text() * 1;
        let action = req.body.action;
        let actionAmount = req.body["invest-dxc"] * 1;
        let actionShare = 0;
        let email = req.session.user.email;
        userModel.findOne({ 'email': email }, 'email dxcShares', function (err, user){
            req.session.user.dxcShares = user.dxcShares * 1;
            if (action === 'buy') {
                actionShare = actionAmount / dxcQuote;
                req.session.user.balance -= actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            dxcShares: req.session.user.dxcShares + actionShare,
                            balance: req.session.user.balance 
                        }
                    }
                ).exec();
            } else if (action === 'sell') {
                actionShare = actionAmount / dxcQuote;
                req.session.user.balance += actionAmount;
                userModel.updateOne(
                    {
                        email: req.session.user.email
                    },
                    {
                        $set: { 
                            dxcShares: req.session.user.dxcShares - actionShare,
                            balance: req.session.user.balance 
                         }
                    }
                ).exec();console.log('share sold')
            } else {
                console.log('action is undefined')
            }
            res.redirect('/dashboard');
        })

    })
})




module.exports = route;