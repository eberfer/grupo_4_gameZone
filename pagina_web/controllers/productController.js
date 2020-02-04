const fs = require('fs');
const path = require('path');

const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');
let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');


// ************ Controller to read EJS file ************

const controller = {
  // Creacion de producto
  newProduct: (req, res) => {
    res.render("newProduct");
  },
  // Listado de productos
 
  products: (req, res) => {
    let products = JSON.parse(contenidoProductosJSON);
    res.render('products', { products })
  },
  
  guardarProducto: (req, res) => {
    // creo array vació
    let arrayDeProductos = [];
    
    // Si el archivo no está vacío 
    if (contenidoProductosJSON != '') {
      // tomo el contenido y lo convierto en un formato de Array de objetos literales
      arrayDeProductos = JSON.parse(contenidoProductosJSON);
    }
    
    // Genero el id para el producto
    req.body = {
      id: arrayDeProductos.length + 1,
      ...req.body
    };
    
    req.body.creador = 'Producto creado por Fer';
    
    // Inserto el producto nuevo
    arrayDeProductos.push(req.body);
    
    // Convierto el arrayDeProductos a JSON
    let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
    
    // guardo el array completo en el archivo JSON
    fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);
    
    // Mensaje de éxito
    
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