var synth = require('synth');

synth.app.use(function (req,res,next) {
	req.url_people = 'back/files/test.json';
	req.url_logins = 'back/files/login.json';
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
