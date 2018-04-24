var express = require('express');
var router = express.Router();
var redis = require('redis')
var client = redis.createClient('6379', 'redis')


/* GET home page. */
router.get('/', function(req, res, next) {
  client.set('test', 'toto', function(err, reply){
    client.get('test', function(err, reply){
      res.render('index', { title: reply });
    })
  })
});

module.exports = router;
