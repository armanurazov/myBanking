const PORT = 8080;
const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const signInRoute = require('./routes/signIn');
const signUpRoute = require('./routes/signUp');
const mongoose = require('mongoose');
const userSchema = require('./models/users');

// const Parser = require('rss-parser');
const app = express();

app.use(express.static('public'))

app.engine('hbs', exhbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(bodyParser.urlencoded({
    extended: true
}));

// ********************* mongoDB connection *********************

mongoose.connect('mongodb+srv://alifromim:Mariam7-una@cluster0.9h7xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(console.log('MongoDB is connected'))
    .catch(console.error());

const userModel = mongoose.model('User', userSchema);

// let user1 = new userModel({
//     fname: 'String',
//     lname: 'String',
//     email: 'String',
//     password: 'String',
//     occupation: 'String',
//     //dateOfBirth: Date,
//     address: 'String',
//     postalCode: 'String',
//     city: 'String',
//     province: 'String',
//     country: 'String',
//     cellNumber: 1111111,
//     prefComm: 'String'
// })

// user1.save()
//     .then(console.log('user was saved'))
//     .catch(console.error());
// **************************************************************

// var dataFromRSS = [];
// var obj = [];

app.get('/', (req, res) => {

    // let parser = new Parser();
    // (async () => {
    //     let feed = await parser.parseURL('https://lenta.ru/rss/last24');
    //     feed.items.forEach(item => {
    //         dataFromRSS.push('{"title": "' + item.title + '", ' + ' "link": "' + item.link + '"}')
    //     });
    //     for (var i = 0; i < 8; i++) {
    //         obj[i] = JSON.parse(dataFromRSS[i])
    //     }
    //     res.json(obj[1].title);
    // })();

    res.render('home');
})

app.use('/signin', signInRoute)

app.use('/signup', signUpRoute)

app.listen(PORT, console.log('Connected to port: ' + PORT));