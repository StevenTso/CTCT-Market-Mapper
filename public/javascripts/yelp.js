//enter a business type and get an array of locations
//var yelpDone = false;

//var yelpData;

function yelp_getLocations(location, businessType, mapType) {
	var auth = {
		consumerKey: YELP_CONSUMER_KEY,
		consumerSecret: YELP_COSUMER_SECRET,
		accessToken: YELP_TOKEN_ACCESS,
		accessTokenSecret: YELP_TOKEN_SECRET,
		serviceProvider: {
			signatureMethod: "HMAC-SHA1"
		}
	};
	var accessor = {
		consumerSecret: auth.consumerSecret,
		tokenSecret: auth.accessTokenSecret
	};
	parameters = [];
	parameters.push(['term', businessType]);
	parameters.push(['location', location]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
	var message = {
		'action': 'http://api.yelp.com/v2/search',
		'method': 'GET',
		'parameters': parameters
	};
	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);
	var parameterMap = OAuth.getParameterMap(message.parameters);
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
	console.log(parameterMap);
	$.ajax({
		'url': message.action,
		'data': parameterMap,
		'cache': true,
		'dataType': 'jsonp',
		'jsonpCallback': 'cb',
		'success': function(data, textStats, XMLHttpRequest) {
			if(mapType == "pin") {
				for(var i=0; i<data.businesses.length; i++) {
					yelp_pushPinLocation(data.businesses[i].location.coordinate);
				}
			}
			else {
				console.log("working");
				var dataSet = [];
				for(var i=0; i<data.businesses.length; i++) {
					dataSet.push(data.businesses[i].location.coordinate);
				}
				yelp_pushHeatMapLocation(dataSet);
			}
		}
	});
}

function yelp_pushPinLocation(coord) {
	//console.log(coord.latitude + ", " + coord.longitude);
	var myLatlng = new google.maps.LatLng(coord.latitude, coord.longitude);
  	var mapOptions = {
    	zoom: 8,
    	center: myLatlng
  	}
  	var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  	});

  	bounds.extend(marker.position);
    map.fitBounds(bounds);


	// To add the marker to the map, call setMap();
	//marker.setMap(map);
}

function yelp_pushHeatMapLocation(coords) {
	var markers = [];
	for(var i=0; i<coords.length; i++) {
		var myLatlng = new google.maps.LatLng(coords[i].latitude, coords[i].longitude);
		markers.push(myLatlng)
		// var marker = new google.maps.Marker({
	 //      position: myLatlng,
	 //      map: map,
	 //      title: 'Hello World!'
	 //  	});
	 //  	bounds.extend(marker.position);
	}

  var pointArray = new google.maps.MVCArray(markers);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    map: map
  });

  heatmap.setMap(map);
    // map.fitBounds(bounds);
}


