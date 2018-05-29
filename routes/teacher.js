var express = require('express');
var router = express.Router();
var redis = require('redis')
var client = redis.createClient('6379', 'redis')
var Models = require('../models/models.js')
var teacher = require('../utils/teacher.js')


router.all('*', (req, res, next) => {
    if(req.session.username === undefined && req.session.etat == 'professeur') {
        res.redirect('/login')
    } else {
        next()
    }
})

/* GET home page. */
router.get('/', function(req, res, next) {
    Models.User.find({etat: 'etudiant'}, function (err, result){
        client.get(req.session.username, function(err, reply) {
            var user = reply
            user = JSON.parse(user)
            name = user.firstname + ' ' + user.lastname
            res.render('teacher/teacher', { users : result, prof: name });
        });
    }).catch (function (err) {
        console.log(err);
    })
});

router.get('/add_grades/:xid', function(req, res, next) {
    var xid = req.params.xid
    Models.User.find({_id: xid}, function (err, user){
        res.render('teacher/add_grades', { users : user[0] });
    }).catch (function (err) {
        console.log(err);
    })
});

router.post('/add_grades', function(req, res, next) {
    var xid = req.body.xid
    var note = req.body.Note
    var coef = req.body.Coef
    client.get(req.session.username, function(err, reply) {
        var user = reply
        user = JSON.parse(user)
        teacher.createNote(xid, user.matiere_id[0], note, coef).then(() => res.redirect('/teachers'))
    });
});

module.exports = router;
