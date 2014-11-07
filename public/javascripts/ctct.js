
function ctct_getLocations(dataSet, mapType) {
    if(mapType == "pin") {
        console.log("djlf")
        for(var i=0; i<dataSet.length; i++) {
            var name = dataSet[i].first_name || "" + " " + dataSet[i].last_name + "";
            var addresses = dataSet[i].addresses;
            if(addresses.length) {
                var addressTemp = addresses[0];
                //street num+name, city, state, postal code
                //line1 + city, state, postal_code
                var address = addressTemp.line1 + " " + addressTemp.city + ", " + addressTemp.state + " " + addressTemp.postal_code;
                var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false"
                $.ajax({
                    url: url
                }).then(function(data) {
                    var coord = data.results[0].geometry.location;
                        ctct_pushPinLocations(coord);
                });
            }
        }
    }
    else {
        var dataArr = [];
        for(var i=0; i<dataSet.length; i++) {
            var name = dataSet[i].first_name || "" + " " + dataSet[i].last_name + "";
            var addresses = dataSet[i].addresses;
            if(addresses.length) {
                var addressTemp = addresses[0];
                //street num+name, city, state, postal code
                //line1 + city, state, postal_code
                var address = addressTemp.line1 + " " + addressTemp.city + ", " + addressTemp.state + " " + addressTemp.postal_code;
                var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false"
                $.ajax({
                    url: url
                }).then(function(data) {
                    var coord = data.results[0].geometry.location;
                    dataArr.push(coord);
                });
            }
        }
        ctct_pushHeatMapLocations(dataArr);
    }
}


function ctct_pushPinLocations(coord) {

    var myLatlng = new google.maps.LatLng(coord.lat, coord.lng);
    var mapOptions = {
        zoom: 8,
        center: myLatlng
    }
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: name
    });
    bounds.extend(marker.position);
    map.fitBounds(bounds);

}

function ctct_pushHeatMapLocations(dataArr) {
    console.log("WHAT")
    console.log(dataArr);
}