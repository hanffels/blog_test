exports.getIndex = function (req,res){
	if (!req.mongodb_on){
		var fs =require('fs');
		var data = JSON.parse(fs.readFileSync(req.url_comments, 'utf8'));
		var article_comments = [];
		//console.log(req.query);
		for (var i = 0; i < data.length; i++) {
			//console.log(data[i].id.substr(0,1)+" - "+req.query.id_article);
			if(data[i].id_article == req.query.id_article){
				article_comments.push(data[i]);
			}
		};
		return article_comments;
	}else{
		return req.db.collection('comments').find({id_article:parseInt(req.query.id_article)}).toArray();
	}
};

exports.getAll = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
	  	return JSON.parse(fs.readFileSync(req.url_comments, 'utf8'));
	  }else{
	  	return req.db.collection('comments').find().toArray();
	  }
};