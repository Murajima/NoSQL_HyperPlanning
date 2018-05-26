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
        var tmp = {}
        var key = ''
        var prev_mat = ''
        var note_array = []
        var itemsProcessed = 0
        var nb_matiere = 0
        var name = ''
        client.get(req.session.username, function(err, reply) {
            var user = reply
            user = JSON.parse(user)
            console.log(user)
            name = user.firstname + ' ' + user.lastname
        });
        notes.forEach(function(element) {
            Models.Matiere.find({_id: element.matiere_id}, function (err, mat){
                if(mat[0].matiere == prev_mat && note_array != []) {
                    note_array.push({Note: element.Note, Coef: element.Coef})
                    data_list[nb_matiere - 1] = {Matiere: key, Notes: note_array}
                } else {
                    if (note_array != []){
                        tmp = []
                        note_array = []
                        nb_matiere++
                    }
                    key = mat[0].matiere
                    note_array.push({Note: element.Note, Coef: element.Coef})
                    prev_mat = key
                }
                itemsProcessed ++
                if (itemsProcessed == notes.length) {
                    returnList = {'User': name, 'Notes': data_list}
                    console.log(returnList)
                    res.render('student/student', { value: returnList})
                }
            })
        })
    })
})

module.exports = router
