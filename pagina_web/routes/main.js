// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


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
/* Get - user login. */
router.get('/userLogin', mainController.userLogin);
/* Get - new product. */
router.get('/newProduct', mainController.newProduct);

module.exports = router;
