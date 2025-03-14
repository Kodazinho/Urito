console.clear();
const express = require('express');
require('dotenv').config();
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const colors = require('colors');

const app = express(); 
const appSer = express(); 
const appKit = express();
const appAdm = express();

const { port, portAdm, portKit, portSer } = process.env;

function setupApp(app, viewsPath, routes) {
    app.set('view engine', 'ejs');  
    app.set('views', path.join(__dirname, viewsPath));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.json({ limit: "10mb" }));
    app.use('/', require(routes));
}

setupApp(app, 'views', './routes/conf');
setupApp(appSer, 'views', './routes/ser');
setupApp(appKit, 'views', './routes/kit');
setupApp(appAdm, 'views', './routes/adm');

const serverKit = http.createServer(appKit);
const serverSer = http.createServer(appSer);
const ioKit = socketIo(serverKit);
const ioSer = socketIo(serverSer);
const socket = require('./socket/index');
socket(ioKit);
socket(ioSer);

app.listen(port, () => {
    console.log(`⚙️ | Servidor configurações aberto em ` + `http://localhost:${port}`.rainbow);
});

serverSer.listen(portSer, () => {
    console.log(`🍾 | Servidor atendimento aberto em ` + `http://localhost:${portSer}`.rainbow);
    console.log(`🖨️ | Servidor pedidos aberto em ` + `http://localhost:${portSer}/pedidos`.rainbow);
});

serverKit.listen(portKit, () => {
    console.log(`🍽️ | Servidor cozinha aberto em ` + `http://localhost:${portKit}`.rainbow);
    console.log(`🚀 | Socket.IO rodando na cozinha em ` +  `http://localhost:${portKit}`.rainbow);
});

appAdm.listen(portAdm, () => {
    console.log(`💸 | Servidor administrador aberto em ` + `http://localhost:${portAdm}`.rainbow);
});
