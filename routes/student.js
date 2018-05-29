var express = require('express');
var router = express.Router();
var redis = require('redis')
var client = redis.createClient('6379', 'redis')
var Models = require('../models/models.js')
var student = require('../utils/student.js')


router.all('*', (req, res, next) => {
    if(req.session.username === undefined && req.session.etat == 'etudiant') {
        res.redirect('/login')
    } else {
        next()
    }
})

router.get('/', function(req, res, next) {
    student.getBulletin(req.session.username).then((result) => {
        res.render('student/student', { value: result})
    })
})

module.exports = router
