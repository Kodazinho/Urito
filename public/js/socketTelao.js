const socket = io();  

socket.on("status", (status) => {
    atualizar(status);
});

function atualizar(pedidos) {
    const finalizado = document.getElementById('finalizado');
    const andamento = document.getElementById('andamento');
    const aguardo = document.getElementById('aguardo');
    finalizado.innerText = '';
    andamento.innerText = '';
    aguardo.innerText = '';
    pedidos.forEach(pedido => {
        if(pedido.andamento == 0){
            aguardo.innerHTML += `<h3 class="text-xl text-white">${pedido.nome} | ID ${pedido.id}</h3> <hr class='text-white w-full'>`;
        }else if(pedido.andamento == 1){
            andamento.innerHTML += `<h3 class="text-xl text-white">${pedido.nome} | ID ${pedido.id}</h3> <hr class='text-white w-full'>`;
        }else{
            finalizado.innerHTML += `<h3 class="text-xl text-white">${pedido.nome} | ID ${pedido.id}</h3> <hr class='text-white w-full'>`;
        }
    })
}
