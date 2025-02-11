console.clear();
const express = require('express');
require('dotenv').config();
const path = require('path');
const socket = require('socket.io');
const colors = require('colors')
const app = express();
const port = process.env.port;

app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`🕷️ | Servidor aberto em` + ` http://localhost:${port}`.rainbow)
})