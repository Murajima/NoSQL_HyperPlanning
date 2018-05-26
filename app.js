var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuidv4 = require('uuid/v4');
var redis = require('redis');
var client = redis.createClient('6379', 'redis');
const PORT = process.env.PORT || 3000

var login = require('./routes/login');
var teachers = require('./routes/teacher');
var student = require('./routes/student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

app.all('*',(req, res, next) => {
    if(!req.session.hasOwnProperty('xuuid') || req.session.xuuid == ''){
        xuuid = uuidv4();
        client.set(xuuid, '', function(err, reply){
            req.session.xuuid = xuuid;
            next()
        })
    }
    else {
        next()
    }

});


app.use('/teachers', teachers);
app.use('/student', student);
app.use('/', login);


app.listen(PORT, () => {
    console.log('Serveur sur port:', PORT)
})


module.exports = app;
