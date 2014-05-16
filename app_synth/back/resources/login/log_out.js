exports.postLogout = function (req, res) {
	req.session.destroy();
	res.send(null);
};