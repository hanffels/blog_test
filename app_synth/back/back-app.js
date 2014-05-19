var synth = require('synth');
var bodyParser = require('body-parser');
var express_session = require('express-session');
var cookieParser = require('cookie-parser');

synth.app.use(cookieParser());
synth.app.use(express_session({
  secret:'bobby',
  store: new express_session.MemoryStore({ reapInterval: 60000 * 10 })
}));
synth.app.use(bodyParser());

synth.app.use(function (req,res,next) {
	req.url_article = 'back/files/article.json';
	req.url_logins = 'back/files/login.json';
	req.url_roles = 'back/files/roles.json';
	next();
});

synth.app.post('/upload', function (req, res) {
	var fs = require('fs');
    var image =  req.files.image;
    console.log(req.files);
    var newImageLocation = "/back/files/images" + image.name;
    
    fs.readFile(image.path, function(err, data) {
        fs.writeFile(newImageLocation, data, function(err) {
            res.json(200, { 
                src: 'images/' + image.name,
                size: image.size
            });
        });
    });
});

/* Init and return synth app */
module.exports = synth();
