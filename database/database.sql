DROP DATABASE IF EXISTS irango;
CREATE DATABASE irango;
USE irango;

CREATE TABLE produtos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    ingredientes TEXT,
    imagem TEXT
)