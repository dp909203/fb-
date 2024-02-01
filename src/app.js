const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer();
const router = require('../src/routes/user.route');

app.use(upload.any());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Demo Project',
            version: '1.0.6',
        },
        servers: [
            {
                url: 'http://localhost:4001/'
            },

        ]
    },
    apis: ['./routes/*.js'],
    
};

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use('/api', router);

module.exports = app;
