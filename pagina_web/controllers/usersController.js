const fs = require('fs');
const path = require('path');

// ************ Controller to read EJS file ************

const controller = {
	
	userRegister: (req, res) => {
		res.render("userRegister");
	},
	userLogin: (req, res) => {
		res.render("userLogin");
	},
	
};

module.exports = controller
