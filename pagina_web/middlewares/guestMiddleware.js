function guestMiddleware (req, res, next) {
		
	if (req.session.userId != undefined) {
		return res.redirect('/userProfile/:id');
	}
	next();
}

module.exports = guestMiddleware;