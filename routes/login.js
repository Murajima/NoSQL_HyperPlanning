const express = require('express')
const session = require('express-session')
const utils = require('../utils/login.js')
const newuser = require('../utils/register')
const redis = require('redis')
const client = redis.createClient('6379', 'redis')
var Models = require('../models/models.js')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login/login')
})

router.post('/login', (req, res, next) => {
    var password = req.body.password
    var username = req.body.username
    utils.loginOK(username, password).then((result) => {
        req.session.username = result.xid
        req.session.etat = result.etat
        client.set(String(result.xid), JSON.stringify({'username': result.username, 'etat': result.etat, 'id': result.xid, 'matiere_id': result.matiere_id, 'lastname': result.lastname, 'firstname': result.firstname}))
        if (result.etat == 'etudiant') {
            res.redirect('/student')
        } else if (result.etat == 'professeur') {
            res.redirect('/teachers')
        }
    }).catch(function(e) {
        res.redirect('/') // "zut !"
    })

})

router.get('/register', (req, res, next) => {
    res.render('login/edit')
})

router.get('/disconnect', (req, res, next) => {
    req.session.username = ''
    res.redirect('/')
})



router.post('/adduser', (req, res, next) => {
        var password = req.body.password
        var username = req.body.username
        var firstname = req.body.firstname
        var lastname = req.body.lastname
        newuser.createUser(username, password, firstname, lastname).then(res.redirect('/'))
})

router.use((req, res) => {
    res.redirect('/')
})


module.exports = router;
