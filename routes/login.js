const express = require('express')
const session = require('express-session')
const newuser = require('../utils/register')

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('login/login')
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
