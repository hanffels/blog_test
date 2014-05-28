exports.postAddComment = function (req,res){
	if (!req.mongodb_on){
		var fs =require('fs');
		var data = JSON.parse(fs.readFileSync(req.url_comments, 'utf8'));
		var article_comment = {};

		article_comment.content = req.body.comment_text;

		var inc=1;
		for (var i = 0; i < data.length; i++) {
			if(data[i].id_article == req.body.article.id)
				inc++;
		};
		article_comment.id = inc;
		article_comment.id_article = req.body.article.id;
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
	}else{
		var article_comment = {};
		article_comment.content = req.body.comment_text;
		article_comment.user = req.session.username;
		article_comment.id_article = req.body.article.id;
		var d = new Date();
		var month;
		if (d.getMonth()+1<10){
			month = "0"+d.getMonth()+1;
		}
		else
			month = d.getMonth()+1;

		article_comment.date =  d.getDate()+"/"+month+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();

		req.db.collection('comments').find({id_article:parseInt(req.body.article.id)}).toArray().then(function (res){
			//console.log(res.length);
			article_comment.id = res.length;
			//console.log(article_comment);
			return req.db.collection('comments').insert(article_comment);
		});
	}
};


exports.postRemoveOne = function (req,res){
	if (!req.mongodb_on){
		var fs =require('fs');
		var data = JSON.parse(fs.readFileSync(req.url_comments, 'utf8'));
		
		for (var i = 0; i < data.length; i++) {
			if(data[i].id == req.body.content.id)
				data.splice(i,1);
		};
		return fs.writeFileSync(req.url_comments, JSON.stringify(data), "UTF-8");
	}else{
		return req.db.collection('comments').remove({id:parseInt(req.body.content.id)});
	}
};

exports.post = function (req,res){
	if (!req.mongodb_on){
		var fs =require('fs');
		return fs.writeFileSync(req.url_comments, JSON.stringify(req.body.content), "UTF-8");
	}else{
		req.db.collection('comments').drop(function (){
			return req.db.collection('comments').insert(req.body.content);
		});
	}
};