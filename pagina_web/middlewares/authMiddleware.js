function authMiddleware (req, res, next) {
	if (res.locals.userId == undefined) {
		return res.redirect('/user/login');
	}
	next();
}

module.exports = authMiddleware;