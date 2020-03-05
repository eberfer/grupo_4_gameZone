const fs = require('fs');
const path = require('path');
const db = require("../database/models")
// const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');
// let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');


// ************ Controller to read EJS file ************

const controller = {
  
  // Creacion de producto
  newProduct: (req, res) => {
    res.render("newProduct");
  },
  // Listado de productos
 
  list: (req, res) => {
    let products = JSON.parse(contenidoProductosJSON);
    res.render('products', { products })
  },
  
  guardarProducto: (req, res) => {
    db.Games.create({
      name: req.body.name,
      price: req.body.price,
      genre_id: req.body.genre,
      platform_id: req.body.platform,
      detail: req.body.detail
    });    
    res.redirect('/products');
  },
  
  borrarProducto: (req, res) => {
    let productosArray = JSON.parse(contenidoProductosJSON);
    let productosSinElQueBorramos = productosArray.filter(function (product) {
      return product.id != req.params.id;
    })
    // guardo el array con los productos finales
    fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));
    res.redirect('/');
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