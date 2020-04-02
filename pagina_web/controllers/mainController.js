const db = require("../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;



// ************ Controller to read EJS file ************

const controller = {	
	home: (req, res) => {
		let traerJuegos = db.Games.findAll();
		let traerGeneros = db.Genres.findAll();
		Promise.all([traerJuegos, traerGeneros])
		.then(([games, genres]) => {
			res.render("home2",{games: games, genres: genres})
		})
		.catch(error => console.log(error));
	}
};
module.exports = controller
