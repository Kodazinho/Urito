let pedido = [];

function add(id) {
    const produto = produtos.find(p => p.id === id);
    
    if (!produto) {
        console.error("Produto não encontrado para ID:", id);
        return;
    }

    const index = pedido.findIndex(item => item.id === id);

    if (index !== -1) {
        pedido[index].quantidade += 1;
    } else {
        pedido.push({
            id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }
    total();
}



function remove(id) {
    const index = pedido.findIndex(item => item.id === id);
    
    if (index !== -1) {
        if (pedido[index].quantidade > 1) {
            pedido[index].quantidade -= 1;
        } else {
            pedido.splice(index, 1); 
        }
    }
    
    total();
}

function total() {
    const divProdo = document.getElementById("produtos");
    divProdo.innerHTML = ""; 
    let total = 0;
    pedido.forEach(produto => {
        total += produto.preco * produto.quantidade;
        const item = document.createElement("div");
        item.innerHTML = `<p class="text-2xl font-extrabold dark:text-white border-b border-white">
            ${produto.quantidade}x | ${produto.nome} 
            <small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">R$ ${produto.preco.toFixed(2)}</small>
        </p>`;
        divProdo.appendChild(item);
    });
    document.getElementById("total").innerText = total.toFixed(2);
}


async function finalizar() {
  const nome = document.getElementById("nomeCliente").value;
  const obs = document.getElementById("observacao").value;
    if (pedido.length === 0) {
        return;
    }

    try {
        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pedido, nome, obs }),
        });

        const data = await response.json();
        pedido = []; 
        total(); 
        document.getElementById("nomeCliente").value = '';
        document.getElementById("observacao").value = '';
    } catch (error) {
    }
}



function renderProducts(list) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = ""; 

    list.forEach(produto => {
      const produtoElement = document.createElement('a');
      produtoElement.href = "#";
      produtoElement.className = "d3d relative w-full flex flex-col items-center bg-gray-700 border border-gray-50 rounded-lg shadow-sm md:flex-row md:max-w-xl transition-all duration-200 hover:bg-gray-900";
      produtoElement.innerHTML = `
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="data:image/png;base64,${produto.imagem}" alt="">
        <div class="flex gap-1 absolute bottom-3 right-3">
          <button type="button" onclick="remove(${produto.id})"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">-</button>
          <button type="button" onclick="add(${produto.id})"
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+</button>
        </div>
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="text-2xl text-white font-extrabold">
            ${produto.nome} <small class="ms-2 font-semibold text-gray-400">R$ ${produto.preco.toFixed(2)}</small>
          </h5>
          <p class="mb-3 font-normal text-gray-300">
            ${produto.ingredientes}
          </p>
        </div>
      `;
      container.appendChild(produtoElement);
    });
  }

  renderProducts(produtos);

  document.getElementById('default-search').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filtered = produtos.filter(produto => {
      return produto.nome.toLowerCase().includes(query) ||
             produto.ingredientes.toLowerCase().includes(query);
    });
    renderProducts(filtered);
  });