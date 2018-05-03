var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    login.loginOK(username, password).then((result) => {
    	req.session.username = result.username
    	req.session.userID = result.id
    	if(result.type == "Professeur"){
    		res.redirect('/teacher')
    	} else {
    		res.redirect('/students')
    	}

    }).catch(function(e) {
      res.redirect('/login') // "zut !"
    })
})

module.exports = router;
