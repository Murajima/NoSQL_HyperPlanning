const express = require('express')
const session = require('express-session')

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('login/login')
})

router.use((req, res) => {
    res.redirect('/login')
})


module.exports = router


// Nom user + idUser + type -> Cle REDIS