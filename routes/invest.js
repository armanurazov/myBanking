const express = require('express');
const userModel = require('../models/users');
const route = express.Router();
const request = require('request');
const cheerio = require('cheerio');



route.get('/', (req, res) => {
    res.render('invest');
})



module.exports = route;