const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');



// ************ Controller to read EJS file ************

const controller = {
	home: (req, res) => {
		res.render("home");
	},	
	newProduct: (req, res) => {
		res.render("newProduct");
	},
	productDetail: (req, res) => {
		res.render("productDetail");
	},
	productCart: (req, res) => {
		res.render("productCart");
	},
	userLogin: (req, res) => {
		res.render("userLogin");
	},
	newProduct: (req, res) => {
		res.render("newProduct")
	}
};

module.exports = controller
