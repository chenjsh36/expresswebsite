/*
	Module dependence
 */
var express = require('express')
	, account_r = require('./routes/account')
	, db = require('./module/db')
	;

/*
	Create server
 */
var app = express();

/*
	Set options
 */
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
console.log('app_views:', app.set('views'));

/*
	Route
 */
app.use('/user', account_r);

/*
	Listen at port and host 
 */
var port = 3000;
var server = app.listen(port, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});

