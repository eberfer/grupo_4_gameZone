const express = require('express');
const router = express.Router();
const apiController = require("../controllers/api/apiController")



router.get('/games', apiController.games);
router.get('/games/:id', apiController.gameDetail);
router.get('/users', apiController.users);
router.get('/users/:id', apiController.userDetail);

module.exports = router;