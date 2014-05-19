exports.getIndex = function (req,res){
	var fs =require('fs');
	return JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));
};
exports.getOneUser = function (req, res) {
	var fs = require('fs');
	var user_info = JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));
	var user={};

	for (var i = user_info.length - 1; i >= 0; i--) {
		if(user_info[i].username == req.session.username){
			user = user_info[i];
		}
	};

  	return user;
};
exports.getIsLogged = function (req, res) {
	var user = {};
	user.isLogged = req.session.isLogged;
	user.role = req.session.role;

	if(!req.session.isLogged){
	 	res.send(user);
	 }
	else
 	  	res.send(user);
};
