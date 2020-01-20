// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuracion de MULTER, seleccion de carpeta de destino 
const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../../public/images/avatars');
	},
	filename: (req, file, cb) => {
		let imageFinalName = `user_avatar_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});

const upload = multer({ storage: storageDisk });

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');
const usersController = require('../controllers/usersController');

/* GET - home page. */
router.get('/', mainController.home);
/* GET - user register page. */
router.get('/userRegister', usersController.userRegister);
/* Get - user login. */
router.get('/userLogin', usersController.userLogin);
/* GET - Listado de productos. */
router.get("/products", productController.products)
/* GET - Agregar nuevo producto. */
router.get('/products/newProduct', productController.newProduct);
/* POST - Guardar el Producto en DB */ 
router.post('/products/newProduct', productController.guardarProducto);
/* DELETE - Borrar un Producto en DB */ 
router.delete('/products/borrar/:id', productController.borrarProducto);
/* GET - product cart. */
router.get('/productCart', productController.productCart);
/* GET - product detail. */
router.get('/productDetail', productController.productDetail);


module.exports = router;
