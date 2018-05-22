var express = require('express');
var router = express.Router();
var redis = require('redis')
var client = redis.createClient('6379', 'redis')
var Models = require('../models/models.js')


router.all('*', (req, res, next) => {
    if(req.session.username == "") {
        res.redirect('/login')
    } else {
        next()
    }
})

/* GET home page. */
router.get('/', function(req, res, next) {
    // client.set('test', 'toto', function(err, reply){
    //   client.get('test', function(err, reply){
    //     res.render('index', { title: reply });
    //   })
    // })
    Models.User.find({}, function (err, user){
        // console.log(user);
        res.render('teacher', { users : user });
    }).catch (function (err) {
        console.log(err);
    })

});

module.exports = router;
