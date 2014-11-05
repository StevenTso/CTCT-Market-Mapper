var RestClient = require('node-rest-client').Client;
var wait=require('wait.for');
var restClient = new RestClient();

var args = {
  headers:{"Content-Type": "application/json", "Authorization": "Bearer 4133dd9e-423f-4461-95ad-14235439d6f0"} 
};

var results = [];

var getContactsCallback = function(data, response){
	console.log("Intial Results : "+data.results);
    return data.results; //No pagination here
}

exports.getDefaultContacts  = function(apiKey){
	return exports.getContacts(apiKey, "ALL", 50);
}

exports.getContacts = function(apiKey, status, limit){
	
	var url  = "https://api.constantcontact.com/v2/contacts?status="+status+"&limit="+limit+"&api_key="+apiKey;

	var results = [];

	restClient.get(url, args, function(data, response){
			results = getContactsCallback(data, response);
		}
	)
	console.log("Final Results : "+results);
	return results;
}

exports.doSomething = function(){
	return 4;
}

exports.getDefaultContacts("k7yur7m7yb5t573vayk7dm3j");

