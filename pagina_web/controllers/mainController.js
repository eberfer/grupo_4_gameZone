const fs = require('fs');
const path = require('path');

// ************ Function to Read an EJS File ************
function readEjs (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.ejs`);
	let ejsFile = fs.readFileSync(filePath, 'utf-8');
	return ejsFile;
}

const controller = {
	home: (req, res) => {
		let ejs = readEjs('home');
		res.send(ejs);
	},
	userRegister: (req, res) => {
		let ejs = readEjs('userRegister');
		res.send(ejs);
	},
	newProduct: (req, res) => {
		let ejs = readEjs('newProduct');
		res.send(ejs);
	},
	productDetail: (req, res) => {
		let ejs = readEjs('productDetail');
		res.send(ejs);
	},
	productCart: (req, res) => {
		let ejs = readEjs('productCart');
		res.send(ejs);
	}
};

module.exports = controller
