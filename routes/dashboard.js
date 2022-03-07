const express = require('express');
const userModel = require('../models/users');
const route = express.Router();
const request = require('request');
const cheerio = require('cheerio')

/***************************** signed in user info ********************************/


route.get('/', (req, res) => {

    var appleQuote, microsQuote, ibmQuote, dxcQuote, xeroxQuote;
    request('https://markets.businessinsider.com/stocks/aapl-stock', function (error, response, body) {
        const $ = cheerio.load(body);
        appleQuote = $(".price-section__current-value").text();
        request('https://markets.businessinsider.com/stocks/msft-stock', function (error, response, body) {
            const $ = cheerio.load(body);
            microsQuote = $(".price-section__current-value").text();
            request('https://markets.businessinsider.com/stocks/ibm-stock', function (error, response, body) {
                const $ = cheerio.load(body);
                ibmQuote = $(".price-section__current-value").text();
                request('https://markets.businessinsider.com/stocks/dxc-stock', function (error, response, body) {
                    const $ = cheerio.load(body);
                    dxcQuote = $(".price-section__current-value").text();
                    request('https://markets.businessinsider.com/stocks/xrx-stock', function (error, response, body) {
                        const $ = cheerio.load(body);
                        xeroxQuote = $(".price-section__current-value").text();
                        res.render('dashboard',
                            {
                                email: req.session.user.email,
                                balance: req.session.user.balance,
                                fname: req.session.user.fname,
                                lname: req.session.user.lname,
                                appleQuote: appleQuote,
                                microsQuote: microsQuote,
                                ibmQuote: ibmQuote,
                                dxcQuote: dxcQuote,
                                xeroxQuote: xeroxQuote
                            });
                    })
                })
            })
        })
    })
});

route.post('/', (req, res) => {

    userModel.find(
        {
            email: req.session.user.email
        }, 'balance', (err, user) => {
            if (err) {
                console.log(err)
            } if (user) {
                req.session.user.balance = user.balance
            }
        });

    let currentBalance = req.session.user.balance * 1;
    let resultBalance
    if (req.body["deposit-amount"]) {
        let depositAmount = req.body["deposit-amount"] * 1;
        resultBalance = currentBalance + depositAmount;
        req.session.user.balance = resultBalance;
        userModel.updateOne(
            {
                email: req.session.user.email
            },
            {
                $set: { balance: resultBalance }
            }
        ).exec();
    } else if (req.body["withdraw-amount"]) {
        let withdrawAmount = req.body["withdraw-amount"] * 1;
        resultBalance = currentBalance - withdrawAmount;
        req.session.user.balance = resultBalance;
        userModel.updateOne(
            {
                email: req.session.user.email
            },
            {
                $set: { balance: resultBalance }
            }
        ).exec();
    } else if (req.body["send-amount"]) {
        let sendAmount = req.body["send-amount"] * 1;
        let receiverEmail = req.body["send-email"];
        let receiverBalanceCurrent;
        resultBalance = currentBalance - sendAmount;

        userModel.findOne(
            {
                email: receiverEmail
            }, 'balance',
            function (err, user) {
                if (err) return handleError(err)
                if (user) {
                    receiverBalanceCurrent = user.balance * 1;
                    let receiverBalanceResult = receiverBalanceCurrent + sendAmount;
                    req.session.user.balance = resultBalance;
                    userModel.updateOne(
                        {
                            email: req.session.user.email
                        },
                        {
                            $set: { balance: resultBalance }
                        }
                    ).exec();
                    userModel.updateOne(
                        {
                            email: receiverEmail
                        },
                        {
                            $set: { balance: receiverBalanceResult }
                        }
                    ).exec();
                }
            });
    } else {
        resultBalance = currentBalance;
        req.session.user.balance = resultBalance;
    }
    res.render('dashboard', {                                 
        balance: req.session.user.balance,
        fname: req.session.user.fname,
        lname: req.session.user.lname, });
})

module.exports = route;
