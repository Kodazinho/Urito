const express = require('express');
const database = require('../../../database/mysql');
const routes = express.Router();

routes.get('/vendas', async (req, res) => {
    const semanal = await database.semanal();
    const mensal = await database.mensal();
    res.render('./adm/estatisticas/vendas', {semanal, mensal});
})

module.exports = routes;