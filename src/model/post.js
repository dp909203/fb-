// post.model.js
const sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', {
        userId: {
            type: Sequelize.BIGINT.UNSIGNED,
            // allowNull: false,
            referances: {
                model: 'users',
                key: 'id'
            }
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    });
    // Post.associate = (models) => {
    //     Post.belongsTo(models.User, { foreignKey: 'userId' });
    // };


    return Post;
};
