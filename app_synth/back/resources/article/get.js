exports.getIndex = function (req, res) {
	var fs = require('fs');
  	return JSON.parse(fs.readFileSync(req.url_article, 'utf8'));
};

exports.getChecked = function (req, res) {
	var fs = require('fs');
	var data = [];
	var origin = JSON.parse(fs.readFileSync(req.url_article, 'utf8'));
	for (var i = 0; i < origin.length; i++) {
		if(origin[i].status == 1)
			data.push(origin[i]);
	};
  	return data;
};

exports.getUnchecked = function (req, res) {
	var fs = require('fs');
	var data = [];
	var origin = JSON.parse(fs.readFileSync(req.url_article, 'utf8'));
	for (var i = 0; i < origin.length; i++) {
		if(origin[i].status == 0)
			data.push(origin[i]);
	};

  	return data;
};
