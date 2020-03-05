module.exports = (sequelize, dataTypes) => {    
    let alias = "UserGame";
    let cols = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        user_id: dataTypes.INTEGER,
        game_id: dataTypes.INTEGER
        }
    let config = {
        timestamps: false
    };

    const UserGame = sequelize.define(alias, cols, config);

    return UserGame;
}