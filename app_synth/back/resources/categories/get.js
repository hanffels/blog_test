exports.getIndex = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
		//console.log(req.url_categories);
	  	return JSON.parse(fs.readFileSync(req.url_categories, 'utf8'));
	  }
	  else{
	  	return req.db.collection('categories').find().toArray();
	  }
};