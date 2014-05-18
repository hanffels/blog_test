exports.postLogFirstCo = function (req, res) {
	console.log('logging');
	var fs = require('fs');
	var logins = JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));

	var username = req.body.username;
	var pwd = req.body.pwd;
	var log = {};
	var check_log_ok=false,i=0;
	while(!check_log_ok && i<logins.length){
		if (username == logins[i].username && pwd == logins[i].pwd){
			check_log_ok = true; 
			role = logins[i].role;
			username = logins[i].username;
		}
		i++;
	}
	if (check_log_ok){
		req.session.isLogged = true;
		req.session.role = role;
		req.session.username = username;
		log.isLogged = true;
		log.role = role;
		res.send(log);
	}
	else{
		req.session.isLogged = false;
		log.isLogged = false;
		res.send(log);
	}

};