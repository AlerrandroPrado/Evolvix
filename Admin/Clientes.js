// Função para alternar a classe 'open' na sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open'); // Adiciona ou remove a classe 'open'
}

// Função para mostrar/ocultar o menu de opções do usuário
function toggleProfileOptions() {
    const profileOptions = document.getElementById('profileOptions');
    profileOptions.classList.toggle('show'); // Exibe ou esconde o menu de opções
}

const CLIENTES_PADRAO = [
    {
        tipoPessoa: 'fisica',
        nome: 'João da Silva',
        nomeSocial: 'Joãozinho',
        cpf: '123.456.789-00',
        genero: 'Masculino',
        dataNascimento: '1985-03-10',
        email: 'joao@email.com',
        telefone: '(11) 98765-4321',
        telefone2: '(11) 91234-5678',
        rua: 'Rua das Flores',
        numero: '123',
        bairro: 'Jardim das Acácias',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
        condominio: 'Residencial Primavera',
        // Campos inexistentes para PF ficam ausentes ou vazios
        razaoSocial: '',
        nomeFant: '',
        cnpj: '',
        inscriacaoEstadual: '',
        status: 'Ativo'
    },
    {
        tipoPessoa: 'juridica',
        razaoSocial: 'Empresa XYZ Ltda',
        nomeFant: 'XYZ Soluções',
        cnpj: '12.345.678/0001-99',
        inscriacaoEstadual: '1234567890',
        email: 'contato@xyz.com.br',
        telefone: '(21) 91234-5678',
        telefone2: '(21) 99876-5432',
        rua: 'Av. das Indústrias',
        numero: '456',
        bairro: 'Centro Industrial',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        cep: '20000-000',
        complemento: 'Bloco B',
        condominio: 'Centro Empresarial RJ',
        // Campos inexistentes para PJ ficam ausentes ou vazios
        nome: '',
        nomeSocial: '',
        cpf: '',
        genero: '',
        dataNascimento: '',
        status: 'Inativo'
    },
    {
        tipoPessoa: 'fisica',
        nome: 'Maria Oliveira',
        nomeSocial: 'Maria O.',
        cpf: '987.654.321-00',
        genero: 'Feminino',
        dataNascimento: '1990-07-22',
        email: 'maria.oliveira@email.com',
        telefone: '(11) 99876-5432',
        telefone2: '(11) 93456-7890',
        rua: 'Rua da Paz',
        numero: '89',
        bairro: 'Vila Nova',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01111-111',
        complemento: '',
        condominio: '',
        razaoSocial: '',
        nomeFant: '',
        cnpj: '',
        inscriacaoEstadual: '',
        status: 'Ativo'
    },
    {
        tipoPessoa: 'juridica',
        razaoSocial: 'Construtora ABC Ltda',
        nomeFant: 'ABC Construções',
        cnpj: '00.123.456/0001-11',
        inscriacaoEstadual: '9876543210',
        email: 'contato@abcconstrutora.com',
        telefone: '(31) 3222-3344',
        telefone2: '(31) 99999-1234',
        rua: 'Av. dos Engenheiros',
        numero: '1000',
        bairro: 'Bairro Industrial',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30000-000',
        complemento: 'Sala 202',
        condominio: 'Edifício Alfa',
        nome: '',
        nomeSocial: '',
        cpf: '',
        genero: '',
        dataNascimento: '',
        status: 'Ativo'
    },
    {
        tipoPessoa: 'fisica',
        nome: 'Carlos Mendes',
        nomeSocial: '',
        cpf: '321.654.987-00',
        genero: 'Masculino',
        dataNascimento: '1978-11-15',
        email: 'carlos.mendes@email.com',
        telefone: '(21) 98888-7777',
        telefone2: '(21) 97777-8888',
        rua: 'Rua do Comércio',
        numero: '12',
        bairro: 'Centro',
        cidade: 'Niterói',
        estado: 'RJ',
        cep: '24000-000',
        complemento: 'Casa',
        condominio: '',
        razaoSocial: '',
        nomeFant: '',
        cnpj: '',
        inscriacaoEstadual: '',
        status: 'Inativo'
    },
    {
        tipoPessoa: 'juridica',
        razaoSocial: 'AgroTech Brasil',
        nomeFant: 'AgroTech',
        cnpj: '23.456.789/0001-55',
        inscriacaoEstadual: '192837465',
        email: 'suporte@agrotech.com.br',
        telefone: '(41) 99999-0000',
        telefone2: '(41) 98888-1111',
        rua: 'Rod. Agrícola BR-101',
        numero: 'KM 45',
        bairro: 'Zona Rural',
        cidade: 'Curitiba',
        estado: 'PR',
        cep: '80000-000',
        complemento: 'Galpão 3',
        condominio: 'Parque Tecnológico Rural',
        nome: '',
        nomeSocial: '',
        cpf: '',
        genero: '',
        dataNascimento: '',
        status: 'Ativo'
    },
    {
        tipoPessoa: 'fisica',
        nome: 'Fernanda Costa',
        nomeSocial: 'Nanda Costa',
        cpf: '111.222.333-44',
        genero: 'Feminino',
        dataNascimento: '1992-05-03',
        email: 'fernanda.costa@email.com',
        telefone: '(62) 91234-5678',
        telefone2: '(62) 99887-6543',
        rua: 'Alameda das Palmeiras',
        numero: '77',
        bairro: 'Setor Oeste',
        cidade: 'Goiânia',
        estado: 'GO',
        cep: '74000-000',
        complemento: '',
        condominio: 'Residencial Goiânia',
        razaoSocial: '',
        nomeFant: '',
        cnpj: '',
        inscriacaoEstadual: '',
        status: 'Ativo'
    },
    {
        tipoPessoa: 'juridica',
        razaoSocial: 'Logística Rápida ME',
        nomeFant: 'LogRápida',
        cnpj: '98.765.432/0001-22',
        inscriacaoEstadual: '654321987',
        email: 'logistica@rapida.com',
        telefone: '(85) 98888-1234',
        telefone2: '(85) 98765-4321',
        rua: 'Rua das Entregas',
        numero: '888',
        bairro: 'Distrito Logístico',
        cidade: 'Fortaleza',
        estado: 'CE',
        cep: '60000-000',
        complemento: 'Galpão A',
        condominio: 'LogPark Fortaleza',
        nome: '',
        nomeSocial: '',
        cpf: '',
        genero: '',
        dataNascimento: '',
        status: 'Inativo'
    }
];


// Função para carregar clientes do localStorage
function carregarClientes() {
    const clientesSalvos = localStorage.getItem("clientes");
    if (clientesSalvos) {
        return JSON.parse(clientesSalvos);
    } else {
        // Salva os clientes padrão no localStorage e retorna eles
        localStorage.setItem("clientes", JSON.stringify(CLIENTES_PADRAO));
        return CLIENTES_PADRAO;
    }
}

// Função para excluir cliente
function excluirCliente(documento) {
    const clientes = carregarClientes();
    const clientesAtualizados = clientes.filter(cliente => cliente.cpf !== documento && cliente.cnpj !== documento);
    localStorage.setItem("clientes", JSON.stringify(clientesAtualizados));
    carregarListaClientes(); // Recarregar a lista após excluir
}

// Função para editar cliente
function editarCliente(documento) {
    localStorage.setItem('clienteEditando', documento);  // Armazena o documento para edição
    window.location.href = 'CadastroCliente.html';// Redireciona para a página de cadastro de cliente
}

// Função para carregar lista de clientes na tabela
function carregarListaClientes(clientesFiltrados = null) {
    const clientes = clientesFiltrados || carregarClientes();
    const tbody = document.getElementById('listaClientes');
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.tipoPessoa}</td>
            <td>${cliente.nome|| cliente.razaoSocial}</td>
            <td>${cliente.cpf || cliente.cnpj}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.status || 'Ativo'}</td>
            <td>
                <button class="btn-editar" onclick="editarCliente('${cliente.cpf || cliente.cnpj}')"><i class="fas fa-edit"></i> </button>
                <button class="btn-excluir" onclick="excluirCliente('${cliente.cpf || cliente.cnpj}')"><i class="fas fa-trash-alt"></i> </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById('busca').addEventListener('input', aplicarFiltro);
document.getElementById('filtroTipo').addEventListener('change', aplicarFiltro);

// Remove pontuação e espaços extras
function removerPontuacao(texto) {
    return texto.replace(/[.\-\/\s()]/g, '').toLowerCase();
}

// Função para aplicar filtro na lista de clientes
function aplicarFiltro() {
    const termoOriginal = document.getElementById('busca').value;
    const termo = removerPontuacao(termoOriginal);
    const tipoFiltro = document.getElementById('filtroTipo').value; // Ex: "fisica", "Pessoa Jurídica", ou vazio

    const clientes = carregarClientes();

    const filtrados = clientes.filter(cliente => {
        const documento = cliente.cpf || cliente.cnpj;
        const campos = removerPontuacao(`${cliente.nome} ${documento} ${cliente.telefone} ${cliente.email}`);
        const tipoOk = tipoFiltro ? (cliente.tipoPessoa === tipoFiltro) || cliente.status === tipoFiltro : true;
        return campos.includes(termo) && tipoOk;
    });

    carregarListaClientes(filtrados); // Renderiza a lista filtrada
}

// Função para criar um novo cliente
document.getElementById('btnNovoCliente').addEventListener('click', () => {
    localStorage.removeItem('clienteEditando'); // Limpa o estado de edição
    window.location.href = 'CadastroCliente.html'; // Redireciona para a página de cadastro
});


// Carregar lista de clientes ao carregar a página
if (window.location.href.includes("Clientes.html")) {
    carregarListaClientes(); // Carrega a lista de clientes ao carregar a página de "Clientes"
}
