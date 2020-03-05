// ************ Require's ************
const express = require('express');
const router = express.Router();



// ************ Controller Require ************

const productController = require('../controllers/productController');
const guestMiddleware = require('../middlewares/guestMiddleware');


router.get("/products", productController.list);
router.get('/products/newProduct', guestMiddleware, productController.newProduct);
router.post('/products/newProduct', productController.guardarProducto);
router.delete('/products/borrar/:id', productController.borrarProducto);
router.get('/productDetail', productController.productDetail);

router.get('/productCart', productController.productCart);

module.exports = router;