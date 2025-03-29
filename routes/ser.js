const express = require('express');
const ipv4Http = require('../middleware/ipv4Http');
const key = require('../middleware/key');
const routes = express.Router();

routes.use('/', ipv4Http, key, require('./ser/home/index'))

module.exports = routes;