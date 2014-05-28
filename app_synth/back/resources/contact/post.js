exports.postAddOneQuestion = function (req, res) {
	if (!req.mongodb_on){
		var fs = require('fs');

		var data = JSON.parse(fs.readFileSync(req.url_contact, 'utf8'));

		var new_question = req.body.content;

		new_question.id = data.length;
		var d = new Date();
		if ((d.getMonth()+1) < 10)
			month = "0"+(d.getMonth()+1);
		else
			month = (d.getMonth()+1);

		new_question.date_hour = d.getDate()+"/"+month+"/"+d.getFullYear()+" "+d.getHours()+" "+d.getMinutes();

		data.push(new_question);

		return fs.writeFileSync(req.url_contact, JSON.stringify(data), "UTF-8");
	} else{
		var new_question = req.body.content;

		
		var d = new Date();
		if ((d.getMonth()+1) < 10)
			month = "0"+(d.getMonth()+1);
		else
			month = (d.getMonth()+1);

		new_question.date_hour = d.getDate()+"/"+month+"/"+d.getFullYear()+" "+d.getHours()+" "+d.getMinutes();

		req.db.collection('contact').find().toArray().then(function (res){
			new_question.id = res.length;

			return req.db.collection('contact').insert(new_question);
		});

	}
};

exports.post = function (req,res){
	if (!req.mongodb_on){
		var fs =require('fs');
		return fs.writeFileSync(req.url_contact, JSON.stringify(req.body.content), "UTF-8");
	}else {
		req.db.collection('contact').drop(function (){
			return req.db.collection('contact').insert(req.body.content);
		});
	}
};