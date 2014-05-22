exports.post = function (req,res){
	var fs =require('fs');
	
	return fs.writeFileSync(req.url_categories, JSON.stringify(req.body.content), "UTF-8");
};