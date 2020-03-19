// ************ Require's ************
const express = require('express');
const router = express.Router();



// ************ Controller Require ************

const productController = require('../controllers/productController');
const guestMiddleware = require('../middlewares/guestMiddleware');


router.get("/products", productController.list);
router.get('/products/newProduct', guestMiddleware, productController.create);
router.post('/products/newProduct', productController.store);
router.patch('/products/edit/:id', productController.edit);
router.delete('/products/delete/:id', productController.delete);
router.get('/products/detail/:id', productController.detail);

router.get('/productCart', productController.productCart);

module.exports = router;