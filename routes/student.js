var express = require('express');
var router = express.Router();
var redis = require('redis')
var client = redis.createClient('6379', 'redis')
var Models = require('../models/models.js')


router.all('*', (req, res, next) => {
    if(req.session.username === undefined) {
        res.redirect('/login')
    } else {
        next()
    }
})

router.get('/', function(req, res, next) {
    Models.Note.find({}, function (err, note){
        res.render('student/student', { notes : note  })
    }).where('User').equals(req.body.User).catch (function (err) {
        console.log(err)
    })
})

module.exports = router
