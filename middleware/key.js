const config = require('../config.json');

async function key(req, res, next) {
    if (!config.key || config.key.trim() === '') {
        return res.status(503).send({ error: 'É necessário uma chave de acesso configurada no servidor.' });
    }

    try {
        const response = await fetch(`http://localhost:5050/key/${config.key}`, {
            method: 'POST'
        });

        const result = await response.json();

        if (result.sucess == true) {
            next();
        } else {
            res.status(503).send({ error: 'A chave registrada no servidor é inválida.' });
        }
    } catch (error) {
        console.error('Erro ao verificar chave:', error);
        res.status(500).send({ error: 'Erro ao verificar a chave com o servidor externo.' });
    }
}

module.exports = key;
