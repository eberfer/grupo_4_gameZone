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
        admin: dataTypes.BOOLEAN        
        };
    let config = {
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);


    return User;
}