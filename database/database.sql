DROP DATABASE IF EXISTS irango;
CREATE DATABASE irango;
USE irango;
SET GLOBAL max_allowed_packet = 67108864;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    ingredientes TEXT,
    imagem LONGTEXT
);

CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    preco DECIMAL(10,2) NOT NULL,
    andamento INT DEFAULT 0,
    nome TEXT NOT NULL,
    retirado BOOLEAN DEFAULT FALSE,
    observacao TEXT
);

CREATE TABLE produto_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idpedido INT NOT NULL,
    quantidade INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idpedido) REFERENCES pedido(id) ON DELETE CASCADE
);
