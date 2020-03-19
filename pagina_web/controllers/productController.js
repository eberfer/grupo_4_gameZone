
const db = require("../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
// const ubicacionProductosJSON = path.join(__dirname, '../data/products.json');
// let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');


// ************ Controller to read EJS file ************

const controller = {  
  // Listado de productos
  list: (req, res) => {
     db.Games
       .findAll({
         include: ["genre", "user", "platform"]
       })
       .then(games => {
         console.log(games);
         
         return res.render("products", {games})
       })
       .catch(error => console.log(error)) 
  },

  // Creacion de producto
  create: (req, res) => {
     db.Genres
     .findAll()
     .then(genres => {
       db.Platforms
         .findAll()
         .then(platforms => {           
           return res.render("newProduct", {platforms, genres});
          })
          .catch(error => {console.log(error)})
      })      
      .catch(error => {console.log(error)});
  },
  
  store: (req, res) => {
    let gameInfo = {
      name: req.body.name,
      expansion: req.body.expansion,
      detail: req.body.detail,
      price: req.body.price,
      platform: req.body.platform,
      img: req.body.gameImg,
      genre: req.body.genre
    };

    db.Games.create(gameInfo
    );
    console.log(gameInfo);
        
    res.redirect('/products');
  },

  edit: (req, res) => {
    
  },
  
  delete: (req, res) => {

  },
  // Detalle de productos
  detail: (req, res) => {
     db.Games
       .findByPk(req.params.id, {
         include: ["platform", "genre"]
       })
       .then(game => {
         console.log(game.genre_id.name);
         
         return res.render("detail", {game})
       })
       .catch(error => console.log(error));
  },
  // Carrito de productos
  productCart: (req, res) => {
    res.render("productCart");
  }
}

module.exports = controller