const mysql = require('mysql2');
require('dotenv').config();
const colors = require('colors')

class Database {
    host
    user
    pass
    database
    connection
    constructor(host, user, pass, database) {
        this.host = host
        this.user = user
        this.pass = pass
        this.database = database
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: pass,
            database: database
        });
    }

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Erro ao conectar:', err);
                return;
            }
            console.log('📕 | Conectado ao ' + 'MySql'.rainbow);
        });
    }

    newProduto(nome, preco, ingredientes, imagem){
        this.connection.query(`INSERT INTO produtos (nome, preco, ingredientes, imagem) VALUES ('${nome}', '${preco}', '${ingredientes}', '${imagem}')`, (err, result) => {
            if (err) {
                console.error('Erro ao inserir:', err);
                return;
            }
        });
    }

    async produtos() {
        const produtos = await this.connection.promise().query('SELECT * FROM produtos');
        return produtos[0]; 
    }
    

}


const database = new Database(process.env.host, process.env.user, process.env.pass, process.env.database);


module.exports = database;