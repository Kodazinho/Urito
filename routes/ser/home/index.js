const express = require('express');
const database = require("../../../database/mysql");
const routes = express.Router();

routes.get('/', async (req, res) => {
    const produtos = await database.produtos();
    res.render('./ser/home/index', {produtos: produtos});
})

routes.get('/telao', (req, res) => {
    res.render('./ser/telao/index');
})

routes.post('/', require('../../../controller/pedido/anotar'));

module.exports = routes;