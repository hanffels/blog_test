exports.post = function (req,res){
	if (!req.mongodb_on){
		var fs =require('fs');
		
		return fs.writeFileSync(req.url_categories, JSON.stringify(req.body.content), "UTF-8");
	}else{
		req.db.collection('categories').drop(function (){
			return req.db.collection('categories').insert(req.body.content);
		});
	}
};