exports.getIndex = function (req, res) {
	var fs = require('fs');
	return JSON.parse(fs.readFileSync(req.url_roles, 'utf8'));
};
