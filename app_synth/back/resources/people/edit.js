exports.post = function (req, res) {
	//console.log(JSON.stringify(req.body.content));
	var fs = require('fs');
	return fs.writeFileSync(req.url_people, JSON.stringify(req.body.content), "UTF-8");
};