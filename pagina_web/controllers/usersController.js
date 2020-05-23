const bcrypt = require('bcrypt');
const db = require("../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

// ************ Controller to read EJS file ************
const controller = {
	// Vista de registro de usuario	
	register: (req, res) => {
		res.render("register");
	},	
	// Almacenando el usuario creado
	store: (req, res,) => {
		db.Users.create({
			userName: req.body.userName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			avatar: req.file.filename,
			country: req.body.country
		}).then(newUser => {			
			res.redirect('/user/login');
		}).catch(error => console.log(error));
	},
	login: (req, res) => {
		res.render("login");
	},

	//comparamos usuario y contraseña ingresada con los registrados en la DB
	processUserLogin: (req, res) => {
		// Buscar usuario en base de datos
		db.Users
		.findAll({where: {email: req.body.email} })
		.then(user => {					 
			if (user[0] != undefined){			
			//Si encontramos al usuario, comparamos contraseñas
				if (bcrypt.compare(req.body.password, user[0].password)) {					
					delete user[0].password;
					// Setear en session el ID y AdminType del usuario
					req.session.user = user[0];								
					// Setear la cookie
					if (req.body.remember_user) {
						res.cookie('userCookie', user[0].id, { maxAge: 60000 * 60 });
						}
						// Redireccionamos al visitante a su perfil
						res.redirect(`/user/profile`);

						} else { res.send ("la contraseña es invalida")}

					} else { res.send("No es un email registrado")} ;	
				})
				.catch(error => console.log(error));		
	},

	//vista de perfil
	profile: (req, res) => {
		db.Users
		.findByPk(res.locals.userId)
		.then(user => {			
				res.render(`profile`, {user: user})} )
				.catch(error => {console.log(error);
				})
	},

	//vista de formulario de edicion
	edit: (req, res) => {
		db.Users
		.findByPk(req.params.id)
		.then(user => {res.render("update", {user})} )
		.catch(error => {console.log(error)	});
	},

	//se envia la orden de reemplazar los datos en DB
	update: (req, res) => {		
		db.Users
		.update({
			userName: req.body.userName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			avatar: req.file.filename,
			country: req.body.country		
		}, {
			where: {id: req.params.id}
		});
		res.redirect(`/user/profile`)
	},

	//Eliminacion de Usuario en DB
	delete: (req, res) => {
		db.Users.destroy({where: {id: req.params.id}})
		res.redirect("/adminUsers")
	},

	//Tabla donde se ven todos los usuarios
	adminBoard: (req, res) => {
		db.Users
			.findAll({where: {admin: 0}})
			.then(users => {res.render("adminUsers", {users}) })
			.catch(error => {console.log(error) });
	},

	logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userCookie', null, { maxAge: 1 });
		
		return res.redirect('/user/login');
	}
	
	
};


module.exports = controller
