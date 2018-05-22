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
    console.log(username)
    utils.loginOK(username, password).then((result) => {
        req.session.username = result.id
        console.log(typeof result.id)
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



router.post('/adduser', (req, res, next) => {
		var password = req.body.password
		var username = req.body.username
		var firstname = req.body.firstname
		var lastname = req.body.lastname
		newuser.createUser(username, password, firstname, lastname).then(res.redirect('/login'))
})

router.use((req, res) => {
    res.redirect('/login')
})


module.exports = router;


// Nom user + idUser + type -> Cle REDIS
