const express = require('express');
const ipv4Http = require('../middleware/ipv4Http');
const routes = express.Router();

routes.use('/', ipv4Http, require('./adm/home/index'));
routes.use('/produto', ipv4Http, require('./adm/produtos/index'));

module.exports = routes;