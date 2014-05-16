var synth = require('synth');
var express_session = require('express-session');
var cookieParser = require('cookie-parser');

synth.app.use(cookieParser());
synth.app.use(express_session({
  secret:'bobby',
  store: new express_session.MemoryStore({ reapInterval: 60000 * 10 })
}));

synth.app.use(function (req,res,next) {
	req.url_people = 'back/files/test.json';
	req.url_logins = 'back/files/login.json';
	//console.log(req.session);
	next();
});

// /* Connect to Mongo DB */
// var db = require('promised-mongo')(process.env.MONGODB || 'tweets-db');

//  Provide DB connection to request handlers 
// synth.app.use(function (req, res, next) {
// 	req.db = db;
// 	next();
// });

/* Init and return synth app */
module.exports = synth();
