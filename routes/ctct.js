var express = require('express');
var router = express.Router();
var dataBridge = require("../ctctDataBridge");

var CTCT_API_KEY = "sj4emtynfdcq26kaf3y8dpuq";

/* GET users listing. */
router.get('/', function(req, res) {
	dataBridge.getDefaultContacts(CTCT_API_KEY, 
		function(data, response){
			console.log("Intial Results : "+data.results);
			res.render('index', { title: 'Expresser', clients: data.results });
		});
});

module.exports = router;