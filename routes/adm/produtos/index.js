const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const express = require('express');
const routes = express.Router();

routes.get('/', async (req, res) => {
    res.render('./adm/produtos/index');
})

routes.post('/', upload.single("imagem"), require('../../../controller/produtos/new'));

module.exports = routes;