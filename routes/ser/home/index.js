const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('./ser/home/index');
})

module.exports = routes;