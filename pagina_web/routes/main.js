// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');
const usersController = require('../controllers/usersController');

/* GET - home page. */
router.get('/', mainController.home);
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

module.exports = router;
