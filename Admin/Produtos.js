function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

//Função para resolver o bug do campo gênero
document.addEventListener('DOMContentLoaded', function () {
    const selects = document.querySelectorAll('.campo select');
    selects.forEach(select => {
        // Função que verifica se o select está com valor
        function verificarValor() {
            if (select.value) {
                select.classList.add('filled');
            } else {
                select.classList.remove('filled');
            }
        }

        // Verifica valor no carregamento da página
        verificarValor();

        // Verifica valor quando o usuário muda a seleção
        select.addEventListener('change', verificarValor);
    });
});

function toggleProfileOptions() {
    const profileOptions = document.getElementById('profileOptions');
    profileOptions.classList.toggle('show');
}

// Carrega os produtos do localStorage ou inicializa com alguns padrões

let produtos = JSON.parse(localStorage.getItem("produtosCadastrados")) || [
    {
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
    }
];

// Salva no localStorage
function salvarProdutos() {
    localStorage.setItem("produtosCadastrados", JSON.stringify(produtos));
}

// Renderiza a tabela de produtos
function renderizarProdutos(lista) {
    const tbody = document.getElementById('listaProdutos');
    tbody.innerHTML = '';

    lista.forEach(produto => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const tr = document.createElement('tr');
        tr.innerHTML = 
            `<td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>${precoFormatado}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.categoria}</td>
            <td>
                <button class="btn-editar" onclick="editarProduto(${produto.codigo})"><i class="fas fa-edit"></i></button>
                <button class="btn-excluir" onclick="excluirProduto(${produto.codigo})"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Remove acentos e pontuações, deixa tudo minúsculo para facilitar filtro
function removerPontuacao(texto) {
    return texto.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\s]/g, '')
                .toLowerCase();
}

// Aplica filtro de busca e categoria
function aplicarFiltro() {
    const termoOriginal = document.getElementById('busca').value;
    const termo = removerPontuacao(termoOriginal);

    const tipo = document.getElementById('filtroTipo').value;

    const filtrados = produtos.filter(produto => {
        const campos = removerPontuacao(`${produto.nome} ${produto.codigo}`);
        const tipoOk = tipo ? produto.categoria === tipo : true;
        return campos.includes(termo) && tipoOk;
    });

    renderizarProdutos(filtrados);
}

// Limpa o formulário e prepara para novo produto (ou edição)
function limparFormulario() {
    document.getElementById("formProduto").reset();
    document.getElementById("codigo").disabled = true;

    // Gera o próximo código automaticamente
    const codigos = produtos.map(p => p.codigo);
    const proximoCodigo = codigos.length > 0 ? Math.max(...codigos) + 1 : 1;
    document.getElementById("codigo").value = proximoCodigo;
}

// Carrega as categorias no select do formulário
function carregarCategoriasNoSelect() {
    const selectCategoria = document.getElementById("categoria");
    selectCategoria.innerHTML = "";

    const categoriasSalvas = JSON.parse(localStorage.getItem("categoriasCadastradas")) || [ { categoria: "Alimentos" },
    { categoria: "Hortifruti" },
    { categoria: "Bebidas" },
    { categoria: "Laticínios" },
    { categoria: "Padaria" },
    { categoria: "Limpeza" },
    { categoria: "Higiene Pessoal" },
    { categoria: "Mercearia" },
    { categoria: "Pet Shop" }];

    // Opção padrão
    const opcaoPadrao = document.createElement("option");
    opcaoPadrao.value = "";
    opcaoPadrao.textContent = "";
    opcaoPadrao.disabled = true;
    opcaoPadrao.selected = true;
    selectCategoria.appendChild(opcaoPadrao);

    categoriasSalvas.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.nome;
        option.textContent = categoria.nome;
        selectCategoria.appendChild(option);
    });
}

// Adiciona ou edita um produto ao submeter o formulário
document.getElementById("formProduto").addEventListener("submit", function (e) {
    e.preventDefault();
     console.log("Formulário submetido");

    const codigo = parseInt(document.getElementById("codigo").value);
    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const categoria = document.getElementById("categoria").value;

    if (!nome || !descricao || isNaN(preco) || isNaN(quantidade) || !categoria) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const index = produtos.findIndex(p => p.codigo === codigo);

    if (index >= 0) {
        // Edição
        produtos[index] = { codigo, nome, descricao, preco, quantidade, categoria };
    } else {
        // Novo produto
        produtos.push({ codigo, nome, descricao, preco, quantidade, categoria });
    }

    salvarProdutos();
    renderizarProdutos(produtos);
    limparFormulario();
    modal.classList.add("hidden");
});

// Preenche o formulário para edição e abre modal
function editarProduto(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);
    if (!produto) return;

    carregarCategoriasNoSelect();

    document.getElementById("codigo").value = produto.codigo;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("descricao").value = produto.descricao;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("categoria").value = produto.categoria;

    document.getElementById("codigo").disabled = true;
    tituloModal.textContent = "Editar Produto";
    modal.classList.remove("hidden");
}

// Exclui produto após confirmação
function excluirProduto(codigo) {
    if (confirm("Deseja realmente excluir este produto?")) {
        produtos = produtos.filter(p => p.codigo !== codigo);
        salvarProdutos();
        renderizarProdutos(produtos);
    }
}

// Eventos para filtro de busca e categoria
document.getElementById('busca').addEventListener('input', aplicarFiltro);
document.getElementById('filtroTipo').addEventListener('change', aplicarFiltro);

// Modal e botões
const modal = document.getElementById("modalProduto");
const btnAbrir = document.getElementById("btnAbrirModal");
const btnFechar = document.getElementById("btnFecharModal");
const btnCancelar = document.getElementById("cancelarModal");
const tituloModal = document.getElementById("tituloModal");

// Abrir modal para adicionar produto
btnAbrir.addEventListener("click", () => {
    limparFormulario();
    carregarCategoriasNoSelect();
    tituloModal.textContent = "Adicionar Produto";
    modal.classList.remove("hidden");
});


// Fechar modal
btnFechar.addEventListener("click", () => modal.classList.add("hidden"));
btnCancelar.addEventListener("click", () => modal.classList.add("hidden"));

// Inicialização
carregarCategoriasNoSelect();
renderizarProdutos(produtos);