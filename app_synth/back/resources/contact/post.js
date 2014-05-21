exports.postAddOneQuestion = function (req, res) {
	console.log("hey");
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
	res.send(null);
};

exports.post = function (req,res){
	var fs =require('fs');
	
	return fs.writeFileSync(req.url_contact, JSON.stringify(req.body.content), "UTF-8");
};