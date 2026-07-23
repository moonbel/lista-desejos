let lista = [];
let indiceEdicao = -1;


//É a função responsável por adicionar um novo produto à lista ou atualizar
//  um produto quando ele está sendo editado. Ela também verifica se o campo "Produto" foi preenchido.
function salvar() {
  let produto = document.getElementById("produto").value;
  let preco = document.getElementById("preco").value;
  let quantidade = document.getElementById("quantidade").value;
  let marca = document.getElementById("marca").value;
  let onde = document.getElementById("onde").value;

  if (produto == "") {
    alert("Preencha o nome do produto!");
    return;
  }

let item = {
  produto: produto,
  preco: preco,
  quantidade: quantidade,
  marca: marca,
  onde: onde
};

if (indiceEdicao == -1) {
    lista.push(item);
} else {
    lista[indiceEdicao] = item;
    indiceEdicao = -1;
    document.getElementById("btnSalvar").innerText = "Adicionar";
}

limparFormulario();
mostrarNaTabela();
}

//Exibe todos os produtos cadastrados na tabela. Além disso, calcula
//  o valor total da compra, multiplicando o preço pela quantidade de cada produto.
function mostrarNaTabela() {
  let tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  let totalCompra = 0;

  for (let i = 0; i < lista.length; i++) {

  let preco = parseFloat(lista[i].preco) || 0;
  let quantidade = parseInt(lista[i].quantidade) || 0;

  let totalProduto = preco * quantidade;

  totalCompra += totalProduto;

  tabela.innerHTML += `
  <tr>
  <td>${lista[i].produto}</td>
    <td>R$ ${preco.toFixed(2)}</td>
    <td>${quantidade}</td>
    <td>R$ ${totalProduto.toFixed(2)}</td>
    <td>${lista[i].marca}</td>
    <td>${lista[i].onde}</td>
  <td>
  <button onclick="editar(${i})">Editar</button>
  <button onclick="excluir(${i})">Excluir</button>
  </td>
 </tr>
 `;
}

  document.getElementById("total").innerHTML =
  "Total da compra: <strong>R$ " + totalCompra.toFixed(2) + "</strong>";
}

//Permite editar um produto. Quando o usuário clica no botão Editar, os dados do produto 
// são colocados novamente nos campos do formulário para que possam ser alterados.
function editar(i) {
  document.getElementById("produto").value = lista[i].produto;
  document.getElementById("preco").value = lista[i].preco;
  document.getElementById("quantidade").value = lista[i].quantidade;
  document.getElementById("marca").value = lista[i].marca;
  document.getElementById("onde").value = lista[i].onde;

  indiceEdicao = i;
  document.getElementById("btnSalvar").innerText = "Atualizar";
}

//Remove um produto da lista quando o usuário clica no botão
//  Excluir. Depois de remover, atualiza a tabela.
function excluir(i) {
  lista.splice(i, 1);
  mostrarNaTabela();
}

//Limpa todos os campos do formulário após um produto ser adicionado
//  ou atualizado, deixando os campos prontos para um novo cadastro.
function limparFormulario() {
  document.getElementById("produto").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("onde").value = "";
}