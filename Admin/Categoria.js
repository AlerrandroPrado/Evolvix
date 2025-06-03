// === SIDEBAR E PERFIL ===
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function toggleProfileOptions() {
    const profileOptions = document.getElementById('profileOptions');
    profileOptions.classList.toggle('show');
}

// === CATEGORIAS ===

// Carrega categorias do localStorage ou usa padrão
let categorias = JSON.parse(localStorage.getItem("categoriasCadastradas")) || [
    { nome: "Alimentos", descricao: "Produtos alimentícios em geral" },
    { nome: "Hortifruti", descricao: "Frutas, verduras e legumes frescos" },
    { nome: "Bebidas", descricao: "Águas, refrigerantes, sucos e alcoólicos" },
    { nome: "Laticínios", descricao: "Queijos, iogurtes, leite e frios" },
    { nome: "Padaria", descricao: "Pães, bolos e produtos de confeitaria" },
    { nome: "Limpeza", descricao: "Produtos de limpeza doméstica" },
    { nome: "Higiene Pessoal", descricao: "Sabonetes, shampoos e cuidados pessoais" },
    { nome: "Mercearia", descricao: "Grãos, massas, enlatados e cereais" },
    { nome: "Pet Shop", descricao: "Alimentos e acessórios para animais" }
];

// Renderiza as categorias
function renderizarCategorias(lista) {
    const tbody = document.getElementById('listaCategorias');
    tbody.innerHTML = '';

    lista.forEach(categoria => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${categoria.nome}</td>
            <td>${categoria.descricao}</td>
            <td>
                <button class="btn-editar" onclick="editarCategoria('${categoria.nome}')"><i class="fas fa-edit"></i></button>
                <button class="btn-excluir" onclick="excluirCategoria('${categoria.nome}')"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Salvar no localStorage
function salvarCategorias() {
    localStorage.setItem("categoriasCadastradas", JSON.stringify(categorias));
}

// Editar categoria
function editarCategoria(nomeCategoria) {
    const categoria = categorias.find(c => c.nome === nomeCategoria);
    if (!categoria) return;

    document.getElementById("nome").value = categoria.nome;
    document.getElementById("descricao").value = categoria.descricao;

    // Aqui estava o erro na duplicata!
    document.getElementById("nome").setAttribute("data-edicao", "true");
    document.getElementById("nome").setAttribute("data-nome-original", categoria.nome);

    tituloModal.textContent = "Editar Categoria";
    modal.classList.remove("hidden");
}

// Excluir categoria
function excluirCategoria(nomeCategoria) {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
        categorias = categorias.filter(c => c.nome !== nomeCategoria);
        salvarCategorias();
        renderizarCategorias(categorias);
    }
}

// Submissão do formulário
document.getElementById("formCategoria").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const estaEditando = document.getElementById("nome").getAttribute("data-edicao") === "true";
    const nomeOriginal = document.getElementById("nome").getAttribute("data-nome-original");

    if (nome === "" || descricao === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const novaCategoria = { nome, descricao };

    if (estaEditando) {
        const index = categorias.findIndex(c => c.nome === nomeOriginal);
        if (index !== -1) {
            categorias[index] = novaCategoria;
        } else {
            alert("Categoria original não encontrada.");
            return;
        }
    } else {
        const jaExiste = categorias.some(c => c.nome === nome);
        if (jaExiste) {
            alert("Já existe uma categoria com esse nome.");
            return;
        }
        categorias.push(novaCategoria);
    }

    salvarCategorias();
    renderizarCategorias(categorias);
    limparFormularioCategoria();
    modal.classList.add("hidden");
});

// Limpa os campos
function limparFormularioCategoria() {
    document.getElementById("formCategoria").reset();
    document.getElementById("nome").removeAttribute("data-edicao");
    document.getElementById("nome").removeAttribute("data-nome-original");
}

// Filtro
document.getElementById('busca').addEventListener('input', aplicarFiltro);
document.getElementById('filtroTipo').addEventListener('change', aplicarFiltro);

function aplicarFiltro() {
    const texto = document.getElementById('busca').value.toLowerCase();
    const resultado = categorias.filter(c => c.nome.toLowerCase().includes(texto));
    renderizarCategorias(resultado);
}

// Inicialização
renderizarCategorias(categorias);

// Modal
const modal = document.getElementById("modalCategoria");
const btnAbrir = document.getElementById("btnAbrirModal");
const btnFechar = document.getElementById("btnFecharModal");
const btnCancelar = document.getElementById("cancelarModal");
const tituloModal = document.getElementById("tituloModal");

// Abrir o modal
btnAbrir.addEventListener("click", (e) => {
    e.preventDefault();
    limparFormularioCategoria();
    tituloModal.textContent = "Adicionar Categoria";
    document.getElementById("nome").disabled = false;
    modal.classList.remove("hidden");
});

// Fechar modal
btnFechar.addEventListener("click", () => modal.classList.add("hidden"));
btnCancelar.addEventListener("click", () => modal.classList.add("hidden"));

function carregarCategoriasNoSelect() {
    const selectCategoria = document.getElementById("categoria");
    selectCategoria.innerHTML = "";

    // Pega categorias do localStorage
    const categoriasSalvas = JSON.parse(localStorage.getItem("categoriasCadastradas")) || [];

    // Adiciona opção padrão
    const opcaoPadrao = document.createElement("option");
    opcaoPadrao.value = "";
    opcaoPadrao.textContent = "Selecione uma categoria";
    opcaoPadrao.disabled = true;
    opcaoPadrao.selected = true;
    selectCategoria.appendChild(opcaoPadrao);

    // Adiciona as categorias
    categoriasSalvas.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.nome;
        option.textContent = categoria.nome;
        selectCategoria.appendChild(option);
    });
}

