const bcrypt = require('bcrypt');
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
	userStore: (req, res,) => {
		db.Users.create({
			userName: req.body.userName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			avatar: req.file.filename,
			country: req.body.country
		}).then(newUser => {			
			res.redirect('userLogin');
		}).catch(error = console.log(error));
	},
	userLogin: (req, res) => {
		res.render("userLogin");
	},
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
					req.session.userId = user[0].id;
					req.session.adminId = user[0].admin;
								
					// Setear la cookie
					if (req.body.remember_user) {
						res.cookie('userCookie', user[0].id, { maxAge: 60000 * 60 });
						}
						// Redireccionamos al visitante a su perfil
						res.redirect("/userProfile/"+user[0].id);

						} else { res.send ("la contraseña es invalida")}

					} else { res.send("No es un email registrado")} ;	
				})
				.catch(error => console.log(error));		
	},
	profile: (req, res) => {
		db.Users
		.findByPk(req.session.userId)
		.then(user => {	res.render(`userProfile`, {user: user})} )
	},
	edit: (req, res) => {
		db.Users
		.findByPk(req.params.id)
		.then(user => {res.render("userEdit", {user})} )
		.catch(error => {console.log(error)	});
	},
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
		console.log(req.body);
		res.redirect("/userProfile/"+ req.session.userId)
	},
	delete: (req, res) => {
		db.Users.destroy({where: {id: req.params.id}})
		res.redirect("/adminUsers")
	},
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
		
		return res.redirect('/userLogin');
	}
	
	
};


module.exports = controller
