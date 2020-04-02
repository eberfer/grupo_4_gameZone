// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const mainController = require('../controllers/mainController');


router.get('/', mainController.home);


module.exports = router;
