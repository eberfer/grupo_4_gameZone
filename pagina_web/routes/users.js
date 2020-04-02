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
router.get('/userRegister', guestMiddleware, usersController.userRegister);
router.post('/userRegister', upload.single('avatar'), usersController.userStore);

router.get('/userLogin', guestMiddleware, usersController.userLogin);
router.post('/userLogin', usersController.processUserLogin);
router.get('/userProfile/:id', authMiddleware, usersController.profile);
router.get("/userEdit/:id", authMiddleware, usersController.edit);
router.post("/userEdit/:id", upload.single("avatar"), usersController.update);
router.post("/userDelete/:id", adminMiddleware, usersController.delete)
router.get('/logout', usersController.logout);
router.get("/adminUsers",authMiddleware, adminMiddleware, usersController.adminBoard);

module.exports = router;