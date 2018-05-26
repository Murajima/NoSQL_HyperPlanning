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
    Models.User.find({}, function (err, user){
        res.render('teacher/teacher', { users : user });
    }).catch (function (err) {
        console.log(err);
    })
});

router.get('/add_grades', function(req, res, next) {
    res.render('teacher/add_grades')
});

router.post('/add_grades', function(req, res, next) {
    Models.User.find({}, function (err, user){
        res.render('teacher/teacher', { users : user });
    }).catch (function (err) {
        console.log(err);
    })
});

module.exports = router;
