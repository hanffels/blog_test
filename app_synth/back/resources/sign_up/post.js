exports.postAddOne = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		var data = JSON.parse(fs.readFileSync(req.url_sign, 'utf8'));
		var new_user = req.body.content;
		new_user = data.length;
		data.push(new_user);

		return fs.writeFileSync(req.url_article, JSON.stringify(data), "UTF-8");
	}

	else {
		var new_user = req.body.content;
		req.db.collection('sign_up').find().toArray().then(function (res){
			new_user.id=res.length;
			new_user.role=0;
			return req.db.collection('sign_up').insert(new_user);
		});
	}
};

exports.post = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		return fs.writeFileSync(req.url_sign, JSON.stringify(req.body.content), "UTF-8");
	}else {
		req.db.collection('sign_up').drop(function (){
			return req.db.collection('sign_up').insert(req.body.content);
		});
	}	
};