// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.home);
/* GET - user register page. */
router.get('/userRegister', mainController.userRegister);
/* GET - add new product. */
router.get('/newProduct', mainController.newProduct);
/* GET - product cart. */
router.get('/productCart', mainController.productCart);
/* GET - product detail. */
router.get('/productDetail', mainController.productDetail);

module.exports = router;
