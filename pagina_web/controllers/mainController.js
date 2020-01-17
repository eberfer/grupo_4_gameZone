const fs = require('fs');
const path = require('path');

// ************ Controller to read EJS file ************

const controller = {
	
	home: (req, res) => {
		res.render("home");
	}
	
};

module.exports = controller
