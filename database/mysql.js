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
    async produto(id) {
        const produto = await this.connection.promise().query('SELECT * FROM produtos WHERE id = ' + id);
        return produto[0][0]; 
    }
    async edit(id, nome, preco, ingredientes, imagem) {
        await this.connection.promise().query(
            `UPDATE produtos SET nome = ?, preco = ?, ingredientes = ?, imagem = ? WHERE id = ?`,
            [nome, parseFloat(preco), ingredientes, imagem, id]
        );
    }
    async delete(id) {
        await this.connection.promise().query('DELETE FROM produtos WHERE id = ?', [id]);
    }
    async anotar(nome, pedido) {
        let total = 0;
        pedido.forEach(item => {
            total += item.preco * item.quantidade;
        });
    
        const connection = this.connection.promise();
        
        try {
            await connection.beginTransaction();
    
            const [resultPedido] = await this.connection.promise().query(
                'INSERT INTO pedido (preco, nome, andamento) VALUES (?, ?, ?)',
                [total, nome, 0]
            );
    
            const pedidoId = resultPedido.insertId;
    
            for (const item of pedido) {
                await connection.query(
                    'INSERT INTO produto_pedido (idpedido, quantidade, nome, preco) VALUES (?, ?, ?, ?)',
                    [pedidoId, item.quantidade, item.nome, item.preco]
                );
            }
    
            await connection.commit();
            return pedidoId;
    
        } catch (error) {
            await connection.rollback();
            throw error;
        }
    }

    async andamento(id) {
        await this.connection.promise().query(
            `UPDATE pedido SET andamento = ? WHERE id = ?`,
            [1, id]
        );
    }
    
    async finalizar(id) {
        await this.connection.promise().query(
            `UPDATE pedido SET andamento = ? WHERE id = ?`,
            [2, id]
        );
    }

    async pedidos() {
        const [pedidos] = await this.connection.promise().query('SELECT * FROM pedido');
        const produtosEpedidos = [];
        for (const pedido of pedidos) {
            const [produtos] = await this.connection.promise().query('SELECT * FROM produto_pedido WHERE idpedido = ?', [pedido.id]);
            produtosEpedidos.push({ pedido, produtos });
        }
        return produtosEpedidos
    }
    
    async status() {
        const status = await this.connection.promise().query('SELECT * FROM pedido');
        return status[0];
    }
    
    
    
    
}


const database = new Database(process.env.host, process.env.user, process.env.pass, process.env.database);

module.exports = database;