exports.getIndex = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');
	  	return JSON.parse(fs.readFileSync(req.url_contact, 'utf8'));
	  }else{
	  	return req.db.collection('contact').find().toArray();
	  }
};