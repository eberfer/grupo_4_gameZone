module.exports = (sequelize, dataTypes) => {    
    let alias = "Users";
    let cols = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        userName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: dataTypes.STRING,
        password: dataTypes.STRING,
        admin: dataTypes.TINYINT        
        };
    let config = {
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsToMany(models.Games, {
            as: "Games",
            through: "UserGame",
            foreignKey: "user_id",
            otherKey: "game_id"
        })
    }
    return User;
}