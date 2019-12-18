const fs = require('fs');
const path = require('path');

const controller = {
	home: (req, res) => {
		res.render('home');
	},
	userRegister: (req, res) => {
		res.render('userRegister');
	},
	newProduct: (req, res) => {
		res.render('newProduct');
	},
	productDetail: (req, res) => {
		res.render('productDetail');
	},
	productCart: (req, res) => {
		res.render('productCart');
	}
};

module.exports = controller
