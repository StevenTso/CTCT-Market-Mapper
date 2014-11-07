var express = require('express');
var router = express.Router();
// var dataBridge = require("../ctctDataBridge.js");
var keys = require("../public/javascripts/keys.js");


var RestClient = require('node-rest-client').Client;
var restClient = new RestClient();

function getDefaultContacts(apiKey, accessToken, callback){
	return getContacts(apiKey, accessToken, callback, "ALL", 150);
}

function getContacts(apiKey, accessToken, callback, status, limit){

	var args = {
	  headers:{"Content-Type": "application/json", "Authorization": "Bearer "+accessToken} 
	};
	
	var url  = "https://api.constantcontact.com/v2/contacts?status="+status+"&limit="+limit+"&api_key="+apiKey;

	restClient.get(url, args, callback);
}



/* GET users listing. */
router.get('/', function(req, res) {
	getDefaultContacts(keys.CTCT_API_KEY, keys.CTCT_TOKEN_ACCESS,
		function(data, response){
			//console.log("Intial Results : "+data.results);
			res.render('index', { title: 'Expresser', customers: JSON.stringify(data.results) });
		});
});

module.exports = router;
