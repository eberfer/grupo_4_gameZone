function adminMiddleware (req, res, next) {
	if (req.session.userId = 0) {
		return res.redirect('/');
	}
	next();
}

module.exports = adminMiddleware;