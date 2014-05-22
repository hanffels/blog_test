exports.getIndex = function (req, res) {
	var fs = require('fs');
	//console.log(req.url_categories);
  	return JSON.parse(fs.readFileSync(req.url_categories, 'utf8'));
};