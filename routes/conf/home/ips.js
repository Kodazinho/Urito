const express = require('express');
const routes = express.Router();

routes.get('/:action/:ip', async (req, res) => {
    const { action, ip } = req.params;
    
})

module.exports = routes;