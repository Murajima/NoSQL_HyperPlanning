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
    var data_list = []
    Models.Note.find({username: req.session.username}, function (err, note){
        var notes = note
        notes.forEach(function(element) {
            Models.Matiere.find({_id: element.matiere_id}, function (err, mat){
                var tmp = {
                    Note: element.Note,
                    Coef: element.Coef,
                    Matiere: mat[0].matiere
                }
                data_list.push(tmp)
                if (data_list.length == notes.length) {
                    res.render('student/student', { notes : data_list })
                }
            })
        })
    })
})

module.exports = router
