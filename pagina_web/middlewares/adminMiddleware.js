function adminMiddleware (req, res, next) {
	if (req.session.adminId == 0) {
		return res.redirect('/');
	}
	next();
}

module.exports = adminMiddleware;