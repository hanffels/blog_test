var synth = require('synth');
var bodyParser = require('body-parser');
var express_session = require('express-session');
var cookieParser = require('cookie-parser');

synth.app.use(cookieParser());
synth.app.use(express_session({
  secret:'bobby',
  store: new express_session.MemoryStore({ reapInterval: 60000 * 10 })
}));
synth.app.use(bodyParser());


var mongodb_on = true;
console.log("MongoDB on : "+mongodb_on);
/* Connect to Mongo DB */
var db = require('promised-mongo')(process.env.MONGODB || 'whatyouhear');

 //Provide DB connection to request handlers 
synth.app.use(function (req, res, next) {
	req.mongodb_on = mongodb_on;
  req.db = db;
  next();
});
/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://55.55.55.5/article');
*/
synth.app.use(function (req,res,next) {
	req.url_article = 'back/files/article.json';
  req.url_comments = 'back/files/comment.json';
	req.url_logins = 'back/files/login.json';
	req.url_roles = 'back/files/roles.json';
  req.url_contact = 'back/files/contact.json';
  req.url_categories = 'back/files/categories.json';
	next();
});

/* Init and return synth app */
module.exports = synth();
