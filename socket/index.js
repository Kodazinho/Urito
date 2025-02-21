const database = require("../database/mysql");

async function socket(io) {
  io.on("connection", (socket) => {
    socket.on("connection", async () => {
      const pedidos = await database.pedidos();
      socket.emit("pedidos", pedidos); 
    });

    setInterval(async () => {
      const pedidos = await database.pedidos();
      io.emit("pedidos", pedidos); 
    }, 750); 
  });
}

module.exports = socket;
