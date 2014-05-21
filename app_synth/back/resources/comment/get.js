exports.getIndex = function (req,res){
	var fs =require('fs');
	var data = JSON.parse(fs.readFileSync(req.url_comments, 'utf8'));
	var article_comments = [];
	//console.log(req.query);
	for (var i = 0; i < data.length; i++) {
		//console.log(data[i].id.substr(0,1)+" - "+req.query.id_article);
		if(data[i].id.substr(0,1) == req.query.id_article){
			article_comments.push(data[i]);
		}
	};
	return article_comments;
};

exports.getAll = function (req, res) {
	var fs = require('fs');
  	return JSON.parse(fs.readFileSync(req.url_comments, 'utf8'));
};