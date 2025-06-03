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

 document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email === "admin@empresa.com" && password === "admin123") {
        window.location.href = "Admin/home.html";
      } else if (email === "funcionario@empresa.com" && password === "func123") {
        window.location.href = "Func/home.html";
      } else {
        alert("E-mail ou senha inválidos!");
      }
    });