
const db = require("../database/models")
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


// ************ Controller to read EJS file ************
const controller = {  
  // Listado de productos
  list: (req, res) => {
    let gamesList = db.Games.findAll();
    let genreList = db.Genres.findAll();
    
    Promise.all([gamesList, genreList])
       .then(([games, genres]) => res.render("products", {games, genres}))
       .catch(error => console.log(error)) 
  },
  listByGenre: (req, res) => {
    db.Games
       .findAll({ where: { genre_id: req.params.id}, include: ["genre", "user"]})
       .then(games => { return res.render("genre", {games}) })
       .catch(error => console.log(error)) 
  },
  // Creacion de producto
  create: (req, res) => {
     db.Genres
     .findAll()
     .then(genres => {return res.render("newProduct", {genres})} )
     .catch(error => {console.log(error)})
  },
  //Guardar producto en DB
  store: (req, res, next) => {    
    // Se almacena toda la informacion que viene del formulario
    let gameInfo = {
      name: req.body.name,
      expansion: req.body.expansion,
      detail: req.body.detail,
      price: req.body.price,
      gameImg: req.file.filename,
      genre_id: req.body.genre_id
    };
    // Se envia a la base de datos la informacion capturada
    db.Games
    .create(gameInfo)
    .then(savedGame => {res.redirect('/products')})
    .catch(error => console.log(error));              
  },

  // Mostramos el Formulario de edicion con los datos originales del producto
  edit: (req, res) => {
    db.Games
      .findByPk(req.params.id, {include: ["genre"] })
      .then(game => {
        db.Genres.findAll()
          .then(genres => {
            console.log(game)
             return res.render("edit", {game: game, genres: genres});                    
           })
          .catch(error => console.log(error));
        })
        .catch(error => console.log(error));      
  },
  // Actualizamos informacion en la base de datos
  update: (req, res) => {
    db.Games
      .update({
          name: req.body.name,
          expansion: req.body.expansion,
          detail: req.body.detail,
          price: req.body.price,
          gameImg: req.file.filename,
          genre_id: req.body.genre_id
        },
        { where: { id: req.params.id } }
      )
      res.redirect("/adminProducts");
  },
  // Detalle de productos
  detail: (req, res) => {
     db.Games
       .findByPk(req.params.id, {
         include: ["genre"]
       })
       .then(game => {  
         if (req.params.id != null){
           return res.render("detail", {game})
         }                        
       })
       .catch(error => console.log(error));
  },
  //Tabla de administracion de productos
  adminBoard: (req, res) => {
		db.Games
       .findAll({include: ["genre"] })
       .then(games => {return res.render("adminProducts", {games}) })
       .catch(error => console.log(error));
	},
  //Borrar producto de DB
  delete: (req, res) => {
    db.Games.destroy({where: {id: req.params.id} })
    res.redirect("/adminProducts")
  },
  // Carrito de productos
  productCart: (req, res) => {
    res.render("productCart");
  }
}

module.exports = controller