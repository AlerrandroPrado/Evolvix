// Mostrar o formulário correto ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    mostrarFormulario();
});

// Função para alternar entre os formulários
function mostrarFormulario() {
    var tipoPessoa = document.querySelector('input[name="tipoPessoa"]:checked').value;

    // Exibe o formulário correto e esconde o outro
    if (tipoPessoa === 'fisica') {
        document.getElementById('formFisica').style.display = 'block';
        document.getElementById('formJuridica').style.display = 'none';
    } else {
        document.getElementById('formFisica').style.display = 'none';
        document.getElementById('formJuridica').style.display = 'block';
    }
}

// Função para carregar os dados do cliente para edição
function carregarClienteParaEdicao() {
    const documento = localStorage.getItem('clienteEditando');
    if (!documento) return; // Se não houver cliente para editar, nada acontece

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = clientes.find(c => c.cpf === documento || c.cnpj === documento); // Busca o cliente com o CPF ou CNPJ

    if (cliente) {
        // Desabilita os botões de tipo de pessoa somente em modo edição
        document.getElementById('tipoFisica').disabled = true;
        document.getElementById('tipoJuridica').disabled = true;

        // Preenche os campos com os dados do cliente
        if (cliente.tipoPessoa === 'fisica') {
            document.getElementById('tipoFisica').checked = true;
            document.getElementById('formFisica').style.display = 'block';
            // ... restante do preenchimento
        } else {
            document.getElementById('tipoJuridica').checked = true;
            document.getElementById('formJuridica').style.display = 'block';
            // ... restante do preenchimento
        }
    }

    if (cliente) {
        // Preenche os campos com os dados do cliente
        if (cliente.tipoPessoa === 'fisica') {
            document.getElementById('tipoFisica').checked = true;
            document.getElementById('formFisica').style.display = 'block';
            document.getElementById('nome').value = cliente.nome;
            document.getElementById('cpf').value = cliente.cpf;
            document.getElementById('nomeSocial').value = cliente.nomeSocial;
            document.getElementById('email').value = cliente.email;
            document.getElementById('telefone').value = cliente.telefone;
            document.getElementById('telefone2').value = cliente.telefone2;
            document.getElementById('genero').value = cliente.genero;
            document.getElementById('rua').value = cliente.rua;
            document.getElementById('numero').value = cliente.numero;
            document.getElementById('bairro').value = cliente.bairro;
            document.getElementById('cidade').value = cliente.cidade;
            document.getElementById('estado').value = cliente.estado;
            document.getElementById('cep').value = cliente.cep;
            document.getElementById('complemento').value = cliente.complemento;
            document.getElementById('condominio').value = cliente.condominio;
            document.getElementById('dataNascimento').value = cliente.dataNascimento;
        } else {
            document.getElementById('tipoJuridica').checked = true;
            document.getElementById('formJuridica').style.display = 'block';
            document.getElementById('razaoSocial').value = cliente.razaoSocial;
            document.getElementById('cnpj').value = cliente.cnpj;
            document.getElementById('nomeFant').value = cliente.nomeFant;
            document.getElementById('inscriacaoEstadual').value = cliente.inscriacaoEstadual;
            document.getElementById('email2').value = cliente.email;
            document.getElementById('telefonej').value = cliente.telefone;
            document.getElementById('telefone2j').value = cliente.telefone2;
            document.getElementById('ruaj').value = cliente.rua;
            document.getElementById('numeroj').value = cliente.numero;
            document.getElementById('bairroj').value = cliente.bairro;
            document.getElementById('cidadej').value = cliente.cidade;
            document.getElementById('estadoj').value = cliente.estado;
            document.getElementById('cepj').value = cliente.cep;
            document.getElementById('complementoj').value = cliente.complemento;
            document.getElementById('condominioj').value = cliente.condominio;
        }
    }
}

// Função para salvar o cliente após edição ou cadastro
document.getElementById('formFisica').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta os dados do formulário de Pessoa Física
    let cliente = {
        tipoPessoa: 'fisica',
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        nomeSocial: document.getElementById('nomeSocial').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        telefone2: document.getElementById('telefone2').value,
        genero: document.getElementById('genero').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        complemento: document.getElementById('complemento').value,
        condominio: document.getElementById('condominio').value,
        dataNascimento: document.getElementById('dataNascimento').value
    };

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const clienteEditando = localStorage.getItem('clienteEditando');

    if (clienteEditando) {
        // Edita o cliente existente
        const index = clientes.findIndex(c => c.cpf === clienteEditando);
        if (index !== -1) {
            clientes[index] = cliente;
            localStorage.setItem('clientes', JSON.stringify(clientes));
            alert("Cliente atualizado com sucesso!");
        }
        localStorage.removeItem('clienteEditando'); // Limpa o estado de edição
    } else {
        // Adiciona um novo cliente
        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        alert("Cliente cadastrado com sucesso!");
    }

    window.location.href = 'Clientes.html'; // Redireciona para a página de clientes
});

document.getElementById('formJuridica').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta os dados do formulário de Pessoa Jurídica
    let cliente = {
        tipoPessoa: 'juridica',
        razaoSocial: document.getElementById('razaoSocial').value,
        cnpj: document.getElementById('cnpj').value,
        nomeFant: document.getElementById('nomeFant').value,
        inscricaoEstadual: document.getElementById('inscriacaoEstadual').value,
        email: document.getElementById('email2').value,
        telefonej: document.getElementById('telefonej').value,
        telefone2j: document.getElementById('telefone2j').value,
        ruaj: document.getElementById('rua').value,
        numeroj: document.getElementById('numeroj').value,
        bairroj: document.getElementById('bairroj').value,
        cidadej: document.getElementById('cidadej').value,
        estadoj: document.getElementById('estadoj').value,
        cepj: document.getElementById('cepj').value,
        complementoj: document.getElementById('complementoj').value,
        condominioj: document.getElementById('condominioj').value
    };

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const clienteEditando = localStorage.getItem('clienteEditando');

    if (clienteEditando) {
        // Edita o cliente existente
        const index = clientes.findIndex(c => c.cnpj === clienteEditando);
        if (index !== -1) {
            clientes[index] = cliente;
            localStorage.setItem('clientes', JSON.stringify(clientes));
            alert("Cliente atualizado com sucesso!");
        }
        localStorage.removeItem('clienteEditando'); // Limpa o estado de edição
    } else {
        // Adiciona um novo cliente
        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        alert("Cliente cadastrado com sucesso!");
    }

    window.location.href = 'Clientes.html'; // Redireciona para a página de clientes
});

// Carregar o cliente para edição ao carregar a página
if (window.location.href.includes("CadastroCliente.html")) {
    carregarClienteParaEdicao(); // Carrega o cliente para edição ao carregar a página de "CadastroCliente"
}

// Sempre verificar qual formulário mostrar ao trocar o tipo de pessoa
document.querySelectorAll('input[name="tipoPessoa"]').forEach(function(input) {
    input.addEventListener('change', mostrarFormulario);
});