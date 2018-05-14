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

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var teachers = require('./routes/prof')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'bower_components')));
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



//on essaye
app.use('/login', login);
app.use('/users', users);
app.use('/teachers', teachers)
app.use('/', login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
