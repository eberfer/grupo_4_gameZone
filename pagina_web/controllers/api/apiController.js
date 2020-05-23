const db = require("../../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


// ************ Controller to read EJS file ************
const controller = {  
    
    //Listado de productos y Total de precios
    
    games: (req, res) => {
        let totalPrice = db.Games.sum("price");
        let gamesList = db.Games.findAll({
            order: [["id", "DESC"]],
            attributes: ['id', 'name', 'expansion', 'detail', 'gameImg']
        });
        
        Promise.all([totalPrice, gamesList])
        .then(([finalPrice, games]) => {
            let respuesta = {
                meta: {
                    status: 200,
                    totalAmount: finalPrice,
                    totalGames: games.length,
                    url: '/api/products'
                },
                data: [games]
            };
            return res.json(respuesta)
        })
    },
    
    gameDetail: (req, res) => {
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
    },
    users: (req, res) => {    
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
    userDetail: (req, res) => {
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