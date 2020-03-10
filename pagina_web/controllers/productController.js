
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
      .then(products => {
        return res.render("products", {products})
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
          return res.render("newProduct", {genres, platforms});
        });
    })
    
  },
  
  store: (req, res) => {
    let gameInfo = {
      name: req.body.name,
      price: req.body.price,
      genre: req.body.genre,
      platform: req.body.platform,
      detail: req.body.detail,
      img: req.body.gameImg
    };

    db.Games.create(gameInfo
    );
    console.log(gameInfo);
        
    res.redirect('/products');
  },
  
  borrarProducto: (req, res) => {

  },
  // Detalle de productos
  detail: (req, res) => {
    db.Games
      .findByPk()
      .then()
      .catch();
    res.render("detail");
  },
  // Carrito de productos
  productCart: (req, res) => {
    res.render("productCart");
  }
}

module.exports = controller