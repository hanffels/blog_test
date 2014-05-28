exports.post = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		return fs.writeFileSync(req.url_logins, JSON.stringify(req.body.content), "UTF-8");
	}else {
		req.db.collection('login').drop(function (){
			return req.db.collection('login').insert(req.body.content);
		});
	}	
};

exports.postModifyUser = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');

		var user = req.body.content;

		var data = JSON.parse(fs.readFileSync(req.url_logins, 'utf8'))

		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].username == user.username){
				data[i] = user;
			}
		};
		//console.log(data);
		return fs.writeFileSync(req.url_logins, JSON.stringify(data), "UTF-8");
	}else{
		var user = req.body.content;
		return req.db.collection('login').update({username:user.username}, user);
	}
};