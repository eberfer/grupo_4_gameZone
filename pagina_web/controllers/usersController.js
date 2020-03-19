const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path')
const db = require("../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


// ************ Controller to read EJS file ************
const controller = {
	// Vista de registro de usuario	
	userRegister: (req, res) => {
		res.render("userRegister");
	},	
	// Almacenando el usuario creado
	userStore: (req, res) => {
		db.Users.create({
			userName: req.body.userName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}).then(newUser => {
			res.redirect('/userLogin');
		}).catch(error = console.log(error));
	},
	userLogin: (req, res) => {
		res.render("userLogin");
	},
	processUserLogin: (req, res) => {
		// Buscar usuario por email
		let user = getUserByEmail(req.body.email);
		
		// Si encontramos al usuario
		if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			if (bcrypt.compareSync(req.body.password, user.password)) {
				// Setear en session el ID del usuario
				req.session.userId = user.id;
				// Setear la cookie
				if (req.body.remember_user) {
					res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });
				}
				// Redireccionamos al visitante a su perfil
				res.redirect('userProfile');
			} else {
				res.send('Credenciales inválidas');
			}
		} else {
			res.send('No hay usuarios registrados con ese email');
		}
	},
	profile: (req, res) => {
		let userLoged = getUserById(req.params.id);
		
		res.render('userProfile', { user: userLoged });
	},
	logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userCookie', null, { maxAge: 1 });
		
		return res.redirect('/userProfile');
	}
	
	
};


module.exports = controller
