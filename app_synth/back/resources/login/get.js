exports.getIndex = function (req, res) {
	var fs = require('fs');
  	return JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));
};

exports.getIsLogged = function (req, res) {
	console.log('Req.session : ');
	return "undef";
	//res.send(null);
	// if(!req.session)
	// 	res.send(false);
	// else
 //  		res.send(true);
};
