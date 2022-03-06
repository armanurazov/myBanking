const PORT = 8000;
const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const signInRoute = require('./routes/signIn');
const signUpRoute = require('./routes/signUp');
const dashboardRoute = require('./routes/dashboard');
const investRoute = require('./routes/invest')
const mongoose = require('mongoose');
const userSchema = require('./models/users');
const clientSessions = require('client-sessions');


const app = express();

app.use(express.static('public'))
app.engine('hbs', exhbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(bodyParser.urlencoded({
    extended: true
}));

// ********************** authantication  ***********************

app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "week10example_web322", // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
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

app.use('/invest', investRoute)


app.listen(process.env.PORT || PORT, console.log('Connected to port: ' + PORT));