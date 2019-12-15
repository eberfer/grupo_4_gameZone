const fs = require('fs');
const path = require('path');

// ************ Function to Read an EJS File ************
function readHtml (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}

const controller = {
	home: (req, res) => {
		let html = readHtml('home');
		res.send(html);
	},
	userRegister: (req, res) => {
		let html = readHtml('userRegister');
		res.send(html);
	},
	newProduct: (req, res) => {
		let html = readHtml('newProduct');
		res.send(html);
	},
	productDetail: (req, res) => {
		let html = readHtml('productDetail');
		res.send(html);
	},
	productCart: (req, res) => {
		let html = readHtml('productCart');
		res.send(html);
	}
};

module.exports = controller
