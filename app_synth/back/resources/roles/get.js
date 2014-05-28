exports.getIndex = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		return JSON.parse(fs.readFileSync(req.url_roles, 'utf8'));
	} else {
		return req.db.collection('roles').find().toArray();
	}
};
