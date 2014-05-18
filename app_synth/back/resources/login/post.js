exports.post = function (req, res) {
	var fs = require('fs');
	return fs.writeFileSync(req.url_logins, JSON.stringify(req.body.content), "UTF-8");
};

exports.postModifyUser = function (req, res) {
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
};