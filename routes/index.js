const express = require('express');
const routes = express.Router();

routes.use('/', require('./home/index.js'))

module.exports = routes;