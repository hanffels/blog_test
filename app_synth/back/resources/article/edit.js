exports.post = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		return fs.writeFileSync(req.url_article, JSON.stringify(req.body.content), "UTF-8");
	}else {
		req.db.collection('article').drop(function (){
			return req.db.collection('article').insert(req.body.content);
		});
	}
};

exports.postModeration = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		console.log('NOT WORKING !!!!!');
		return fs.writeFileSync(req.url_article, JSON.stringify(req.body.content), "UTF-8");
	}else {
		req.db.collection('article').remove({status:0});
		return req.db.collection('article').insert(req.body.content);
	}
};

