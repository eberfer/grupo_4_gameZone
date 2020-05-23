const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuracion de MULTER, seleccion de carpeta de destino 
const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../public/images/avatars');
	},
	filename: (req, file, cb) => {
		let imageFinalName = `user_avatar_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});

const upload = multer({ storage: storageDisk });
// ************ Controller Require ************

const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require("../middlewares/adminMiddleware")

//Routes
router.get('/user/register', guestMiddleware, usersController.register);
router.post('/user/register', upload.single('avatar'), usersController.store);

router.get('/user/login', guestMiddleware, usersController.login);
router.post('/user/login', usersController.processUserLogin);
router.get('/user/profile', usersController.profile);
router.get("/user/:id/update", authMiddleware, usersController.edit);
router.post("/user/:id/update", upload.single("avatar"), usersController.update);
router.post("/user/:id/delete", adminMiddleware, usersController.delete)
router.get('/logout', usersController.logout);
router.get("/adminUsers", usersController.adminBoard);

module.exports = router;