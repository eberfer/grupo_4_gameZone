module.exports = (sequelize, dataTypes) => {
    let alias = "Platforms";
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

    const Platform = sequelize.define(alias, cols, config);

    Platform.associate = (models) => {
        Platform.hasMany(models.Games, {
            as: "games",
            foreignKey: "platform_id"
        })
    }

    return Platform;
}