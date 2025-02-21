const express = require('express');
const ipv4Http = require('../middleware/ipv4Http');
const routes = express.Router();

routes.use('/', ipv4Http, require('./kit/index'));

module.exports = routes;