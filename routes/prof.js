var express = require('express');
var router = express.Router();
var redis = require('redis')
var client = redis.createClient('6379', 'redis')
var Models = require('../models/models.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  // client.set('test', 'toto', function(err, reply){
  //   client.get('test', function(err, reply){
  //     res.render('index', { title: reply });
  //   })
  // })
  console.log('lets go')
  Models.User.find({}, function (err, user){
    console.log(user)
    res.render('prof', { users : user });
  })
});

module.exports = router;
