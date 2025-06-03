// Função para alternar a classe 'open' na sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Função para mostrar/ocultar o menu de opções do usuário
function toggleProfileOptions() {
    const profileOptions = document.getElementById('profileOptions');
    profileOptions.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
    const usuario = "João da Silva";
    const hoje = new Date().toLocaleDateString('pt-BR');
    document.getElementById("nomeUsuario").textContent = usuario;
    document.getElementById("dataVenda").textContent = hoje;
});

// Recupera os produtos do localStorage e transforma em objeto indexado por código
const lista = JSON.parse(localStorage.getItem("produtosCadastrados")) || [{
    codigo: 1,
    nome: "Maçã Fuji",
    descricao: "Maçã fresca e crocante",
    preco: 3.50,
    quantidade: 100,
    categoria: "Hortifruti"
},
{
    codigo: 2,
    nome: "Leite Integral",
    descricao: "Leite de vaca pasteurizado 1L",
    preco: 4.90,
    quantidade: 50,
    categoria: "Laticinios"
},
{
    codigo: 3,
    nome: "Pão Francês",
    descricao: "Pão crocante de padaria",
    preco: 0.50,
    quantidade: 200,
    categoria: "Padaria"
},
{
    codigo: 4,
    nome: "Detergente Neutro",
    descricao: "Detergente para louças 500ml",
    preco: 2.30,
    quantidade: 80,
    categoria: "Limpeza"
},
{
    codigo: 5,
    nome: "Shampoo Anticaspa",
    descricao: "Shampoo 350ml com ação anticaspa",
    preco: 12.99,
    quantidade: 40,
    categoria: "Higiene Pessoal"
},
{
    codigo: 6,
    nome: "Ração para Cães",
    descricao: "Ração seca para cães adultos 10kg",
    preco: 89.90,
    quantidade: 25,
    categoria: "Pet Shop"
},
{
    codigo: 7,
    nome: "Feijão Carioca",
    descricao: "Feijão tipo 1 - pacote 1kg",
    preco: 7.80,
    quantidade: 60,
    categoria: "Mercearia"
},
{
    codigo: 8,
    nome: "Refrigerante Cola",
    descricao: "Refrigerante sabor cola 2L",
    preco: 6.50,
    quantidade: 90,
    categoria: "Bebidas"
}];

const produtos = {};
lista.forEach(p => {
    produtos[p.codigo] = {
        nome: p.nome,
        preco: p.preco,
        quantidade: p.quantidade
    };
});

let listaProdutos = [];

function salvarProdutos() {
    // Atualiza a lista com os dados do objeto produtos
    for (let i = 0; i < lista.length; i++) {
        const codigo = lista[i].codigo;
        if (produtos[codigo]) {
            lista[i].quantidade = produtos[codigo].quantidade;
        }
    }

    // Agora salva no localStorage com as quantidades atualizadas
    localStorage.setItem("produtosCadastrados", JSON.stringify(lista));
}

function adicionarProduto() {
    const codigo = document.getElementById("codigoProduto").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const desconto = parseFloat(document.getElementById("desconto").value) || 0;
    const percentualDesconto = desconto > 0 ? desconto / 100 : 0;

    if (!produtos[codigo]) {
        alert("Produto não encontrado!");
        return;
    }

    const produto = produtos[codigo];

    let tipoVenda = ''; // "peso" ou "quantidade"
    let quantidadeVendida = 0;
    let total = 0;

    if (!isNaN(peso) && peso > 0) {
        // Venda por peso
        tipoVenda = 'peso';
        if (peso > produto.quantidade) {
            alert(`Estoque insuficiente! Restam apenas ${produto.quantidade} kg.`);
            return;
        }
        quantidadeVendida = peso;
        total = produto.preco * peso * (1 - percentualDesconto); // no caso de peso
        produto.quantidade -= peso;

    } else if (!isNaN(quantidade) && quantidade > 0) {
        // Venda por unidade
        tipoVenda = 'quantidade';
        if (quantidade > produto.quantidade) {
            alert(`Estoque insuficiente! Restam apenas ${produto.quantidade} unidades.`);
            return;
        }
        quantidadeVendida = quantidade;
        total = produto.preco * quantidade * (1 - percentualDesconto); // no caso de unidade
        produto.quantidade -= quantidade;

    } else {
        alert("Informe uma quantidade ou peso válidos!");
        return;
    }

    listaProdutos.push({
    descricao: produto.nome,
    quantidade: quantidadeVendida,
    unitario: produto.preco,
    total: total,
    tipoVenda: tipoVenda,
    desconto: desconto // salva o percentual para mostrar depois, se quiser
});

    atualizarTabela();
    limparCampos();
    calcularSubtotal();
    salvarProdutos();
}


function atualizarTabela() {
    const tbody = document.getElementById("tabelaProdutos");
    tbody.innerHTML = "";

    listaProdutos.forEach((item, index) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.descricao}</td>
            <td>${item.quantidade} ${item.tipoVenda === "peso" ? "kg" : "un"}</td>
            <td>R$ ${item.unitario.toFixed(2).replace('.', ',')}</td>
            <td>R$ ${item.total.toFixed(2).replace('.', ',')}</td>
            <td><button class="btn-excluir" onclick="excluirProduto(${index})">Excluir</button></td>
        `;
        tbody.appendChild(linha);
    });
}

function limparCampos() {
    document.getElementById("codigoProduto").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("desconto").value = "";
    document.getElementById("codigoProduto").focus();
}


function calcularSubtotal() {
    const subtotal = listaProdutos.reduce((acc, item) => acc + item.total, 0);
    document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    calcularTroco();
}

function calcularTroco() {
    const subtotal = listaProdutos.reduce((acc, item) => acc + item.total, 0);
    const valorPago = parseFloat(document.getElementById("valorPago").value.replace(',', '.')) || 0;
    const troco = valorPago - subtotal;

    document.getElementById("troco").textContent =
        troco >= 0 ? `R$ ${troco.toFixed(2).replace('.', ',')}` : "R$ 0,00";
}

document.querySelector(".produto-form").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        adicionarProduto();
    }
});

function excluirProduto(index) {
    const confirmacao = confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmacao) return;

    const itemRemovido = listaProdutos[index];

    // Encontra o produto pelo nome (você pode usar o código se preferir)
    const produtoCorrespondente = Object.entries(produtos).find(([codigo, prod]) => prod.nome === itemRemovido.descricao);

    if (produtoCorrespondente) {
        const codigoProduto = produtoCorrespondente[0];
        produtos[codigoProduto].quantidade += itemRemovido.quantidade;

        // Atualiza também na lista principal e salva
        salvarProdutos();
    }

    // Remove o item da venda
    listaProdutos.splice(index, 1);

    atualizarTabela();
    calcularSubtotal();
}

function excluirTodosProdutos() {
    const confirmacao = confirm("Tem certeza que deseja excluir todos os produtos da venda?");
    if (!confirmacao) return;

    // Repor o estoque de cada item
    listaProdutos.forEach(item => {
        const produtoCorrespondente = Object.entries(produtos).find(([codigo, prod]) => prod.nome === item.descricao);
        if (produtoCorrespondente) {
            const codigoProduto = produtoCorrespondente[0];
            produtos[codigoProduto].quantidade += item.quantidade;
        }
    });

    // Limpa a lista de produtos da venda
    listaProdutos = [];

    // Atualiza a interface e salva os dados
    atualizarTabela();
    calcularSubtotal();
    salvarProdutos();
}

function finalizarCompra() {
    if (listaProdutos.length === 0) {
        alert("Nenhum produto adicionado à venda.");
        return;
    }

    const valorPagoStr = document.getElementById("valorPago").value.trim();
    if (!valorPagoStr) {
        alert("Digite o valor pago pelo cliente.");
        document.getElementById("valorPago").focus();
        return;
    }

    const valorPago = parseFloat(valorPagoStr.replace(',', '.'));
    if (isNaN(valorPago) || valorPago <= 0) {
        alert("Valor pago inválido.");
        document.getElementById("valorPago").focus();
        return;
    }

    const nomeVendedor = "João da Silva";
    const data = new Date().toLocaleString("pt-BR");
    const subtotal = listaProdutos.reduce((acc, item) => acc + item.total, 0);
    const troco = valorPago - subtotal;

    if (troco < 0) {
        alert(`Valor pago insuficiente. Faltam R$ ${(Math.abs(troco)).toFixed(2).replace('.', ',')}.`);
        return;
    }

    let relatorio = `
        <h2>Relatório da Venda</h2>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Vendedor:</strong> ${nomeVendedor}</p>
        <table border="1" cellspacing="0" cellpadding="5">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Produto</th>
                    <th>Qtd / Peso</th>
                    <th>Unitário</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    listaProdutos.forEach((item, index) => {
        relatorio += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.descricao}</td>
                <td>${item.quantidade} ${item.tipoVenda === "peso" ? "kg" : "un"}</td>
                <td>R$ ${item.unitario.toFixed(2).replace('.', ',')}</td>
                <td>R$ ${item.total.toFixed(2).replace('.', ',')}</td>
            </tr>
        `;
    });

    relatorio += `
            </tbody>
        </table>
        <p><strong>Subtotal:</strong> R$ ${subtotal.toFixed(2).replace('.', ',')}</p>
        <p><strong>Valor Pago:</strong> R$ ${valorPago.toFixed(2).replace('.', ',')}</p>
        <p><strong>Troco:</strong> R$ ${troco.toFixed(2).replace('.', ',')}</p>
    `;

    // Abre o relatório em nova janela e imprime
    const win = window.open("", "_blank");
    win.document.write(`<html><head><title>Relatório de Venda</title></head><body>${relatorio}</body></html>`);
    win.document.close();
    win.print();
    // Limpa a venda atual
    listaProdutos = [];
    atualizarTabela();
    calcularSubtotal();
    document.getElementById("valorPago").value = "";
    document.getElementById("troco").textContent = "R$ 0,00";
}

