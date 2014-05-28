exports.getIndex = function (req,res){
	if (!req.mongodb_on){
		var fs =require('fs');
		return JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));
	}else{
		return req.db.collection('login').find().toArray();
	}
};
exports.getOneUser = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		var user_info = JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));
		var user=[];

		for (var i = user_info.length - 1; i >= 0; i--) {
			if(user_info[i].username == req.session.username){
				user.push(user_info[i]);
			}
		};

	  	return user;
	}else{
		return req.db.collection('login').find({username:req.session.username}).toArray();
	}
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
