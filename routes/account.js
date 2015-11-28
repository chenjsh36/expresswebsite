/*
	Module require
 */
var express = require('express')
	, bodyParser = require('body-parser')
	, multer = require('multer')
	, db = require('./../module/db.js')
	;

/*
	Exports and Create Server
 */
var app = module.exports = express();	

var upload = multer();// for parsing multipart/form-data

/*
	Use middler
 */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


/*
	Router
 */
app.get('/', function (req, res, next) {
	// 直接返回字符串
	// res.send('hello, welcome to log in view');
	// 使用模板引擎
	res.render('login', {authenticated: false});
});

app.post('/login', upload.array(), function (req, res, next) {
	console.log('account.js: req.body:', req.body);
	var username_ = req.body.username
		, password_ = req.body.password
		;
	var search_user = {
		username: username_,
		password: password_
	};
	/*
	Database
	 */
	db.open(function(){
		db.collection('user').find().toArray(function(err, result){
				if (err) {
					throw err;
				}
				// db.collection('user').find().toArray(function(err, result){
				// 	if (err) {
				// 		throw err;
				// 	}

				// 	console.log(result);
				// });
				db.collection('user').find(search_user).toArray(function(err, result){
					if (err) {
						throw err;
					}
					console.log('accout.js: result:', result);
					if (result.length === 0) {
						res.send('not ok');
					} else {
						res.send('ok');
					}
				})
		});
	});
});

app.get('/info', function (req, res, next) {
	res.send('Hello, welcome to personal info view');
});

