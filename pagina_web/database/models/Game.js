module.exports = (sequelize, dataTypes) => {
    let alias = "Games";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: dataTypes.STRING,
        price: dataTypes.INTEGER,
        genre_id: dataTypes.INTEGER,
        platform_id: dataTypes.INTEGER,
        detail: dataTypes.STRING
    }
    let config = {
        timestamps: false
    }

    const Game = sequelize.define(alias, cols, config)

    Game.associate = (models) => {
        Game.belongsTo(models.Platforms, {
            as: "platform",
            foreignKey: "platform_id"
        });
        Game.belongsTo(models.Genres, {
            as: "genre",
            foreignKey: "genre_id"
        });
        Game.belongsToMany(models.Users, {
            as: "users",
            through: "userGame",
            foreignKey: "game_id",
            otherKey: "user_id"
        })
    }

    return Game;
}