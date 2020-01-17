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
<<<<<<< HEAD

/* envio y procesamiento de formulario de registro de usuario */
router.get('/userRegister', mainController.userRegister);
router.post('/userRegister', upload.single('avatar'), mainController.store);


/* Carga de nuevo producto. */
router.get('/newProduct', mainController.newProduct);
/* GET - Formulario Creación Productos */ 
router.get('/productos/crear', mainController.mostrarFormulario);
/* POST - Guardar el Producto en DB */ 
router.post('/productos/crear', mainController.guardarProducto);
/* DELETE - Borrar un Producto en DB */ 
router.delete('/productos/borrar/:id', mainController.borrarProducto);
/* detalle de producto */
router.get('/productDetail', mainController.productDetail);


/* carrito de compra de usuario */
router.get('/productCart', mainController.productCart);

/* seccion de Logueo y procesamiento de logueo */
router.get('/userLogin', mainController.userLogin);
router.post('/Userlogin', mainController.processLogin);

router.get('/profile/:id', mainController.profile);
=======
/* GET - user register page. */
router.get('/userRegister', usersController.userRegister);
/* GET - add new product. */
router.get('/newProduct', productController.newProduct);
/* GET - product cart. */
router.get("/products", productController.products)
/* GET - product cart. */
router.get('/productCart', productController.productCart);
/* GET - product detail. */
router.get('/productDetail', productController.productDetail);
/* Get - user login. */
router.get('/userLogin', usersController.userLogin);
/* Get - new product. */
router.get('/newProduct', productController.newProduct);
>>>>>>> tmp

module.exports = router;
