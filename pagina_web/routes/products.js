// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path');

//almacenamiento de archivos
const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../public/images/productImg');
	},
	filename: (req, file, cb) => {
		let imageFinalName = `game_img_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});
const upload = multer({ storage: storageDisk });

// ************ Controller Require ************

const productController = require('../controllers/productController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require("../middlewares/adminMiddleware")


router.get("/products", productController.list);
router.get('/products/newProduct', adminMiddleware, productController.create);
router.post('/products/newProduct', upload.single("gameImg"), productController.store);
router.get('/products/detail/:id', productController.detail);
router.get('/products/edit/:id', adminMiddleware, productController.edit);
router.post('/products/edit/:id', upload.single("gameImg"),productController.update);
router.post('/products/delete/:id', adminMiddleware, productController.delete);
router.get("/adminProducts", adminMiddleware, productController.adminBoard);
router.get('/productCart', productController.productCart);

module.exports = router;