exports.postLogFirstCo = function (req, res) {
	console.log('Log : '+req.body.username);
	var fs = require('fs');

	var username = req.body.username;
	var pwd = req.body.pwd;
	var log = {};
	if (!req.mongodb_on){
		var check_log_ok=false,i=0;
		var logins = JSON.parse(fs.readFileSync(req.url_logins, 'utf8'));
		while(!check_log_ok && i<logins.length){
			if (username == logins[i].username && pwd == logins[i].pwd){
				check_log_ok = true; 
				role = logins[i].role;
				username = logins[i].username;
				id = logins[i].id;
			}
			i++;
		}

		if (check_log_ok){
			req.session.isLogged = true;
			req.session.role = role;
			req.session.username = username;
			req.session.user_id = id;
			log.isLogged = true;
			log.role = role;
			res.send(log);
		}
		else{
			req.session.isLogged = false;
			log.isLogged = false;
			res.send(log);
		}

	}else {
		return req.db.collection('login').find({username:username, pwd:pwd}).toArray().then(function (res){
			var check_log_ok = false;

			if(res.length != 0){
				check_log_ok = true;
				role = res[0].role;
				username = res[0].username;
				id = res[0].id;
			}

			if (check_log_ok){
				req.session.isLogged = true;
				req.session.role = role;
				req.session.username = username;
				req.session.user_id = id;
				log.isLogged = true;
				log.role = role;
				console.log(log);
				return log;
			}
			else{
				req.session.isLogged = false;
				log.isLogged = false;
				return log;
			}
		});
	}
};