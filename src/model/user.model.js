const sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        token: {
            type: Sequelize.STRING,
            allowNull: true,
        },



    })

    // User.associate = (models) => {
    //     User.hasMany(models.Post, { foreignKey: 'userId' });
    // };



    return User;
}