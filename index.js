console.clear();
const express = require('express');
require('dotenv').config();
const path = require('path');
const socket = require('socket.io');
const colors = require('colors');

const app = express(); 
const appSer = express(); 
const appKit = express();
const appAdm = express();

const { port, portAdm, portKit, portSer } = process.env;

app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/', require('./routes/conf'));

appSer.set('view engine', 'ejs');  
appSer.set('views', path.join(__dirname, 'views'));
appSer.use(express.static(path.join(__dirname, 'public')));
appSer.use(express.json());
appSer.use('/', require('./routes/ser'));

appKit.set('view engine', 'ejs');  
appKit.set('views', path.join(__dirname, 'views'));
appKit.use(express.static(path.join(__dirname, 'public')));
appKit.use(express.json());
appKit.use('/', require('./routes/kit'));

appAdm.set('view engine', 'ejs');  
appAdm.set('views', path.join(__dirname, 'views'));
appAdm.use(express.static(path.join(__dirname, 'public')));
appAdm.use(express.json());
appAdm.use('/', require('./routes/adm'));

app.listen(port, () => {
    console.log(`⚙️ | Servidor configurações aberto em ` + `http://localhost:${port}`.rainbow);
});

appSer.listen(portSer, () => {
    console.log(`🍾 | Servidor atendimento aberto em ` + `http://localhost:${portSer}`.rainbow);
});

appKit.listen(portKit, () => {
    console.log(`🍽️ | Servidor cozinha aberto em ` + `http://localhost:${portKit}`.rainbow);
});

appAdm.listen(portAdm, () => {
    console.log(`💸 | Servidor administrador aberto em ` + `http://localhost:${portAdm}`.rainbow);
});
