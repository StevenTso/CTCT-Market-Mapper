var RestClient = require('node-rest-client').Client;
var restClient = new RestClient();

exports.getDefaultContacts  = function(apiKey, accessToken, callback){
	return exports.getContacts(apiKey, accessToken, callback, "ALL", 150);
}

exports.getContacts = function(apiKey, accessToken, callback, status, limit){

	var args = {
	  headers:{"Content-Type": "application/json", "Authorization": "Bearer "+accessToken} 
	};
	
	var url  = "https://api.constantcontact.com/v2/contacts?status="+status+"&limit="+limit+"&api_key="+apiKey;

	restClient.get(url, args, callback);
}

