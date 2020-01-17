const fs = require('fs');
const path = require('path');
// const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');

// let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

// ************ Controller to read EJS file ************

const controller = {
    // Creacion de producto
    newProduct: (req, res) => {
		res.render("newProduct");
    },
    // Listado de productos
	products: (req, res) => {
		res.render("products");
    },
    // Detalle de productos
	productDetail: (req, res) => {
		res.render("productDetail");
    },
    // Carrito de productos
	productCart: (req, res) => {
		res.render("productCart");
	}
}

module.exports = controller