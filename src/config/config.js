require('dotenv').config()

module.exports = {
    database: {
        database: process.env.DB_DATABASE || "fb",
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || 'mysql'

    },
    protocol: process.env.PROTOCOL || 'http',
    port: process.env.PORT || 4001,


};
