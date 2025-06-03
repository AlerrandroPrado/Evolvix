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

// Pré-cadastra usuários apenas se ainda não existem
    const usuariosPreCadastrados = [
        {
            nome: "Admin",
            email: "admin@empresa.com",
            password: "admin123",
            nivel: "Administrativo"
        },
        {
            nome: "Funcionário",
            email: "funcionario@empresa.com",
            password: "func123",
            nivel: "Funcionario"
        }
    ];

    // Carrega os usuários existentes e adiciona os pré-cadastrados se necessário
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuariosPreCadastrados.forEach(pre => {
        const existe = usuarios.some(u => u.email === pre.email);
        if (!existe) {
            usuarios.push(pre);
        }
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Evento de login
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("loginForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio do formulário

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // IMPORTANTE: recarrega os usuários atualizados do localStorage
            const usuariosAtualizados = JSON.parse(localStorage.getItem("usuarios")) || [];

            const usuario = usuariosAtualizados.find(u => u.email === email && u.password === password);

            if (usuario) {
                switch (usuario.nivel) {
                    case "Administrativo":
                        window.location.href = "Admin/home.html";
                        break;
                    case "Funcionario":
                        window.location.href = "Func/Venda.html";
                        break;
                    default:
                        alert("Nível de usuário inválido!");
                }
            } else {
                alert("E-mail ou senha inválidos!");
            }

        });
    });