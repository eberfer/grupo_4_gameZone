module.exports = (sequelize, dataTypes) => {
    let alias = "Genres";
    let cols = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        name: dataTypes.INTEGER
    };
    let config = {
        timestamps: false
    };

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models => {
        Genre.hasMany(models.Games, {
            as: "games",
            foreignKey: "genre_id"
        })
    })

    return Genre;
}