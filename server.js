const PORT = 8002;
const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session')
const signInRoute = require('./routes/signIn');
const signUpRoute = require('./routes/signUp');
const dashboardRoute = require('./routes/dashboard');
const mongoose = require('mongoose');
const userSchema = require('./models/users');

// const Parser = require('rss-parser');
const app = express();

app.use(express.static('public'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

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

// **************************************************************


app.get('/', (req, res) => {

    res.render('home');
})

app.use('/signin', signInRoute.route)

app.use('/signup', signUpRoute)

app.use('/dashboard', dashboardRoute)


app.listen(process.env.PORT || PORT, console.log('Connected to port: ' + PORT));