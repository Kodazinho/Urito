const express = require('express');
const ipv4Http = require('../middleware/ipv4Http');
const routes = express.Router();

routes.use('/', ipv4Http, require('./ser/home/index'))

module.exports = routes;