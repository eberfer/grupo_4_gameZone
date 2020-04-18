
const db = require("../../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


// ************ Controller to read EJS file ************
const controller = {  
  // Listado de productos
  list: (req, res) => {    
    db.Games.findAll({include: [{association: "genre"}]})
       .then(games => {
         games.forEach(oneGame => {
           oneGame.setDataValue('endpoint', `/api/products/${oneGame.id}` )           
         });
           let respuesta = {
               meta: {
                   status: 200,
                   total: games.length,
                   url: '/api/products'
               },
               data: games
           };
           res.json(respuesta);
       })
       .catch(error => console.log(error)) 
  },
  detail: (req, res) => {
    db.Games
    .findByPk(req.params.id)
    .then(game => {
      if(game != null){
        res.json(game)
      } else {         
        res.send("No existe ese Producto")
        }
    })
    .catch(error => {console.log(error);
    })
  }
}

module.exports = controller