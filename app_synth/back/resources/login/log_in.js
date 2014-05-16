exports.postLogFirstCo = function (req, res) {
	console.log('logging');
	var fs = require('fs');
	var logins = JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));

	var username = req.body.username;
	var pwd = req.body.pwd;

	var check_log_ok=false,i=0;
	while(!check_log_ok && i<logins.length){
		if (username == logins[i].username && pwd == logins[i].pwd)
			check_log_ok = true;
		i++;
	}
	if (check_log_ok){
		req.session.isLogged = true;
		res.send(true);
	}
	else{
		req.session.isLogged = false;
		res.send(false);
	}

};