const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect,
        logging: console.log,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../model/user.model')(sequelize, Sequelize)
db.Post = require('../model/post')(sequelize, Sequelize)

db.User.hasOne(db.Post, { foreignKey: 'userId' });
db.Post.belongsTo(db.User, { foreignKey: 'userId' });

sequelize.sync()
    .then(() => {
        console.log('Database synchronized.');
    })
    .catch((error) => {
        console.error('Unable to synchronize the database:', error);
    });

module.exports = db;
