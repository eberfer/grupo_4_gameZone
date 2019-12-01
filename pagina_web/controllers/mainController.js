const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}

const controller = {
	home: (req, res) => {
		let html = readHTML('home');
		res.send(html);
	},
	userRegister: (req, res) => {
		let html = readHTML('userRegister');
		res.send(html);
	},
	newProduct: (req, res) => {
		let html = readHTML('newProduct');
		res.send(html);
	},
	productDetail: (req, res) => {
		let html = readHTML('productDetail');
		res.send(html);
	},
	productCart: (req, res) => {
		let html = readHTML('productCart');
		res.send(html);
	}
};

module.exports = controller
