exports.getIndex = function (req, res) {
	var fs = require('fs');
  	return JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));
};

exports.getIsLogged = function (req, res) {
	console.log(req.session.isLogged);
	//res.send(null);
	if(!req.session.isLogged)
	 	res.send(false);
	else
 	  	res.send(true);
};
