exports.getIndex = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
	  	return JSON.parse(fs.readFileSync(req.url_article, 'utf8'));
	}else
  		return req.db.collection('article').find().toArray();
};

exports.getChecked = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		var data = [];
		var origin = JSON.parse(fs.readFileSync(req.url_article, 'utf8'));
		for (var i = 0; i < origin.length; i++) {
			if(origin[i].status == 1)
				data.push(origin[i]);
		};
	  	return data;
	  }
	  else{
	  	return req.db.collection('article').find({status:1}).sort({id:-1}).toArray();
	  }
};

exports.getUnchecked = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		var data = [];
		var origin = JSON.parse(fs.readFileSync(req.url_article, 'utf8'));
		for (var i = 0; i < origin.length; i++) {
			if(origin[i].status == 0)
				data.push(origin[i]);
		};
		//console.log(data);
	  	return data;
	}
	else{
		return req.db.collection('article').find({status:0}).toArray();
	}
};
