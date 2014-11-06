var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  var keys = require('./keys');
  console.log(keys);
  res.render('index', { title: 'Expresser' });
});

module.exports = router;
