exports.postAddOneArticle = function (req, res) {
	var fs = require('fs');

	var data = JSON.parse(fs.readFileSync(req.url_article, 'utf8'));

	var new_article = req.body.content;

	new_article.id = data.length;
	var d = new Date();
	if ((d.getMonth()+1) < 10)
		month = "0"+(d.getMonth()+1);
	else
		month = (d.getMonth()+1);

	new_article.date_hour = d.getDate()+"/"+month+"/"+d.getFullYear()+" "+d.getHours()+" "+d.getMinutes();
	new_article.user = req.session.user_id;

	data.push(new_article);

	return fs.writeFileSync(req.url_article, JSON.stringify(data), "UTF-8");
};