const express = require('express')
const session = require('express-session')
const utils = require('../utils/login.js')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login/login')
})

router.post('/loginOK', (req, res, next) => {
    var password = req.body.password
    var username = req.body.username
    utils.loginOK(username, password).then((result) => {
        if (result.etat == 'etudiant') {
            res.redirect('/register')
        } else if (result.etat == 'professeur') {
            res.redirect('/teachers')
        }
    }).catch(function(e) {
      res.redirect('/login') // "zut !"
    })

})

router.get('/register', (req, res, next) => {
    res.render('login/edit')
})

router.use((req, res) => {
    res.redirect('/login')
})


module.exports = router;


// Nom user + idUser + type -> Cle REDIS