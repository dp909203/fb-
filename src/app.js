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


app.use('/', router);

module.exports = app;
