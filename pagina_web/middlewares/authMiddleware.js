function authMiddleware (req, res, next) {
	if (req.session.userId == undefined) {
		return res.redirect('/userLogin');
	}
	next();
}

module.exports = authMiddleware;