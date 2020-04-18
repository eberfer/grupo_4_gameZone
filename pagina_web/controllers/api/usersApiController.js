const db = require("../../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


// ************ Controller to read EJS file ************
const controller = {  
  // Listado de Users
  list: (req, res) => {    
    db.Users.findAll()
       .then(users => {
         users.forEach(oneUser => {
           oneUser.setDataValue('endpoint', `/api/users/${oneUser.id}` )           
         });
           let respuesta = {
               meta: {
                   status: 200,
                   total: users.length,
                   url: '/api/users'
               },
               data: users
           };
           res.json(respuesta);
       })
       .catch(error => console.log(error)) 
  },
  detail: (req, res) => {
    db.Users
    .findByPk(req.params.id)
    .then(user => {
      if(user != null){
        res.json(user)
      } else {         
        res.send("No existe ese Usuario")
        }
    })
    .catch(error => {console.log(error);
    })
  }
}

module.exports = controller