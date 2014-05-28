exports.post = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		return fs.writeFileSync(req.url_roles, JSON.stringify(req.body.content), "UTF-8");
	}else {
		req.db.collection('roles').drop(function (){
			return req.db.collection('roles').insert(req.body.content);
		});
	}	
};