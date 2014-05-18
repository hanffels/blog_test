var synth = require('synth');
var express_session = require('express-session');
var cookieParser = require('cookie-parser');

synth.app.use(cookieParser());
synth.app.use(express_session({
  secret:'bobby',
  store: new express_session.MemoryStore({ reapInterval: 60000 * 10 })
}));

synth.app.use(function (req,res,next) {
	req.url_article = 'back/files/article.json';
	req.url_logins = 'back/files/login.json';
	req.url_roles = 'back/files/roles.json';
	next();
});

/* Init and return synth app */
module.exports = synth();
