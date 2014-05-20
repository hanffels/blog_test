exports.post = function(req, res) {
	fs = require('fs');

	console.log(req.body);

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name;

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		  var newPath = "/back/files/images/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {
		  });
		}
	});
};