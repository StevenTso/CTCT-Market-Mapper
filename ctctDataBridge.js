var RestClient = require('node-rest-client').Client;
var restClient = new RestClient();

var CTCT_TOKEN_ACCESS = "40293785-1497-4703-adb5-163088891bfd";

var args = {
  headers:{"Content-Type": "application/json", "Authorization": "Bearer "+CTCT_TOKEN_ACCESS} 
};

var getContactsCallback = function(data, response){
	console.log("Intial Results : "+data.results);
    return data.results; //No pagination here
}

exports.getDefaultContacts  = function(apiKey, callback){
	return exports.getContacts(apiKey, callback, "ALL", 50);
}

exports.getContacts = function(apiKey, callback, status, limit){
	
	var url  = "https://api.constantcontact.com/v2/contacts?status="+status+"&limit="+limit+"&api_key="+apiKey;

	restClient.get(url, args, callback);
}

