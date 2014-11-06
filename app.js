
var ctctRoute = require("./routes/ctct");
var express = require('express');
var app = express();
app.set('view engine', 'jade')
app.use('/', express.static(__dirname + '/public/'));
app.use('/ctct', ctctRoute);

app.listen(3000, function() { console.log('listening')});