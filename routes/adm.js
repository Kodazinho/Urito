const express = require('express');
const routes = express.Router();

routes.use('/', require('./adm/home/index'))

module.exports = routes;