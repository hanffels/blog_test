exports.postAddComment = function (req,res){
	var fs =require('fs');
	var data = JSON.parse(fs.readFileSync(req.url_comments, 'utf8'));
	var article_comment = {};

	article_comment.content = req.body.comment_text;

	var inc=1;
	for (var i = 0; i < data.length; i++) {
		if(data[i].id.substr(0,1) == req.body.article.id)
			inc++;
	};
	article_comment.id = req.body.article.id+"_"+inc;
	article_comment.user = req.session.username;
	var d = new Date();
	var month;
	if (d.getMonth()+1<10){
		month = "0"+d.getMonth()+1;
	}
	else
		month = d.getMonth()+1;

	article_comment.date =  d.getDate()+"/"+month+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();

	data.push(article_comment);
	return fs.writeFileSync(req.url_comments, JSON.stringify(data), "UTF-8");
};


exports.postRemoveOne = function (req,res){
	var fs =require('fs');
	var data = JSON.parse(fs.readFileSync(req.url_comments, 'utf8'));
	
	for (var i = 0; i < data.length; i++) {
		if(data[i].id == req.body.content.id)
			data.splice(i,1);
	};
	return fs.writeFileSync(req.url_comments, JSON.stringify(data), "UTF-8");
};