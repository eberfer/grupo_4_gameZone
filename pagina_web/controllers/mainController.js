const db = require("../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;



// ************ Controller to read EJS file ************

const controller = {
	
	home: (req, res) => {
		let usuarioLogueado = db.Users.findByPk(req.session.userId)
		let juegos = 
		db.Games
       		.findAll({ include: ["genre"]})
			.then(game => {
				res.render("home2", {game})
			})
			.catch(error => console.log(error))
		}		
};

module.exports = controller
