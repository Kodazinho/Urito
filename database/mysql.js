const mysql = require('mysql2');
const colors = require('colors')

// Criando conexão
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: '', 
    database: 'irango'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar:', err);
        return;
    }
    console.log('📕 | Conectado ao ' + 'MySql'.rainbow);
});

module.exports = connection;