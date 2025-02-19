const database = require('../../database/mysql');
const multer = require("multer");

    async function controller(req, res){
        const {nome, preco, ingredientes} = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Nenhuma imagem enviada!" });
        }
        const imagem64 = req.file.buffer.toString("base64");
        await database.newProduto(nome, preco, ingredientes, imagem64);

        res.redirect('/')
    }

    module.exports = controller;