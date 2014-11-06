var express = require('express');
var router = express.Router();
var dataBridge = require("../ctctDataBridge");
var keys = require("../public/javascripts/keys");

console.log("API_KEY: "+keys.CTCT_API_KEY);

/* GET users listing. */
router.get('/', function(req, res) {
	dataBridge.getDefaultContacts(keys.CTCT_API_KEY, keys.CTCT_TOKEN_ACCESS,
		function(data, response){
			console.log("Intial Results : "+data.results);
			res.render('index', { title: 'Expresser', customers: JSON.stringify(data.results) });
		});
});

module.exports = router;
