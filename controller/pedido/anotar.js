const database = require('../../database/mysql');    

async function controller(req, res){
    const {pedido, nome} = req.body;
    database.anotar(nome, pedido);
    res.send({sucess: true});
}

module.exports = controller;