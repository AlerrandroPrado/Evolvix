// Função para alternar visibilidade da senha
document.addEventListener("DOMContentLoaded", () => {
  // Selecionar todos os botões de toggle de senha
  const toggleButtons = document.querySelectorAll(".toggle-password")

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input")
      const eyeIcon = this.querySelector(".eye-icon")
      const eyeOffIcon = this.querySelector(".eye-off-icon")

      // Alternar tipo de input
      if (input.type === "password") {
        input.type = "text"
        eyeIcon.classList.add("hidden")
        eyeOffIcon.classList.remove("hidden")
      } else {
        input.type = "password"
        eyeIcon.classList.remove("hidden")
        eyeOffIcon.classList.add("hidden")
      }
    })
  })

  // Função para mostrar mensagem de erro
  function showError(message, formId) {
    const errorElement = document.querySelector("#" + formId + " #errorMessage")
    if (errorElement) {
      const span = errorElement.querySelector("span")
      span.textContent = message
      errorElement.classList.remove("hidden")
    }
  }

  // Função para esconder mensagem de erro
  function hideError(formId) {
    const errorElement = document.querySelector("#" + formId + " #errorMessage")
    if (errorElement) {
      errorElement.classList.add("hidden")
    }
  }

  // Função para mostrar/esconder loader
  function toggleLoader(buttonId, show) {
    const button = document.getElementById(buttonId)
    if (button) {
      const buttonText = button.querySelector(".btn-text")
      const buttonLoader = button.querySelector(".btn-loader")

      if (show) {
        buttonText.classList.add("hidden")
        buttonLoader.classList.remove("hidden")
        button.disabled = true
      } else {
        buttonText.classList.remove("hidden")
        buttonLoader.classList.add("hidden")
        button.disabled = false
      }
    }
  }

  // Inicializar usuários padrão se não existirem
  function initializeDefaultUsers() {
    const users = JSON.parse(localStorage.getItem("evolvixUsers")) || []

    // Verificar se os usuários padrão já existem
    const adminExists = users.some((user) => user.email === "admin@empresa.com")
    const funcExists = users.some((user) => user.email === "funcionario@empresa.com")

    // Se não existirem, adicionar usuários padrão
    if (!adminExists) {
      users.push({
        name: "Administrador",
        email: "admin@empresa.com",
        password: "admin123",
        userLevel: "Administrativo",
      })
    }

    if (!funcExists) {
      users.push({
        name: "Funcionário",
        email: "funcionario@empresa.com",
        password: "func123",
        userLevel: "Funcionario",
      })
    }

    // Salvar no localStorage
    localStorage.setItem("evolvixUsers", JSON.stringify(users))
    return users
  }

  // Inicializar usuários padrão
  const users = initializeDefaultUsers()

  // Formulário de login
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value.trim()

      hideError("loginForm")
      toggleLoader("loginButton", true)

      // Buscar usuários do localStorage
      const users = JSON.parse(localStorage.getItem("evolvixUsers")) || []

      // Simular tempo de processamento
      setTimeout(() => {
        // Encontrar usuário com email e senha correspondentes
        const user = users.find((u) => u.email === email && u.password === password)

        if (user) {
          // Salvar usuário logado
          localStorage.setItem(
            "evolvixCurrentUser",
            JSON.stringify({
              name: user.name,
              email: user.email,
              userLevel: user.userLevel,
            }),
          )

          // Redirecionar com base no nível do usuário
          if (user.userLevel === "Administrativo") {
            window.location.href = "Admin/home.html"
          } else {
            window.location.href = "Func/historico-vendas.html"
          }
        } else {
          showError("E-mail ou senha inválidos!", "loginForm")
          toggleLoader("loginButton", false)
        }
      }, 1000)
    })
  }

  // Formulário de cadastro
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value.trim()
      const userLevel = document.querySelector('input[name="nivel"]:checked')

      hideError("registerForm")

      // Validações
      if (!name) {
        showError("Por favor, informe seu nome completo", "registerForm")
        return
      }

      if (!email) {
        showError("Por favor, informe seu e-mail", "registerForm")
        return
      }

      if (!isValidEmail(email)) {
        showError("Por favor, informe um e-mail válido", "registerForm")
        return
      }

      if (!password) {
        showError("Por favor, informe uma senha", "registerForm")
        return
      }

      if (password.length < 6) {
        showError("A senha deve ter pelo menos 6 caracteres", "registerForm")
        return
      }

      if (!userLevel) {
        showError("Por favor, selecione o nível de usuário", "registerForm")
        return
      }

      toggleLoader("registerButton", true)

      // Buscar usuários existentes
      const users = JSON.parse(localStorage.getItem("evolvixUsers")) || []

      // Verificar se o e-mail já está cadastrado
      if (users.some((user) => user.email === email)) {
        showError("Este e-mail já está cadastrado", "registerForm")
        toggleLoader("registerButton", false)
        return
      }

      // Adicionar novo usuário
      const newUser = {
        name: name,
        email: email,
        password: password,
        userLevel: userLevel.value,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)

      // Salvar no localStorage
      localStorage.setItem("evolvixUsers", JSON.stringify(users))

      // Simular tempo de processamento
      setTimeout(() => {
        // Exibir mensagem de sucesso
        alert("Cadastro realizado com sucesso! Você será redirecionado para o login.")

        // Redirecionar para página de login
        window.location.href = "index.html"
      }, 1500)
    })
  }

  // Formulário de recuperação de senha
  const forgotPasswordForm = document.getElementById("forgotPasswordForm")
  const forgotPasswordCard = document.getElementById("forgotPasswordCard")
  const successCard = document.getElementById("successCard")
  const tryAgainButton = document.getElementById("tryAgainButton")

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value.trim()

      if (!email) {
        alert("Por favor, informe seu e-mail")
        return
      }

      if (!isValidEmail(email)) {
        alert("Por favor, informe um e-mail válido")
        return
      }

      toggleLoader("resetButton", true)

      // Verificar se o e-mail existe
      const users = JSON.parse(localStorage.getItem("evolvixUsers")) || []
      const userExists = users.some((user) => user.email === email)

      // Simular envio de e-mail
      setTimeout(() => {
        if (forgotPasswordCard && successCard) {
          // Armazenar o e-mail para recuperação
          if (userExists) {
            localStorage.setItem("evolvixPasswordReset", email)
          }

          forgotPasswordCard.classList.add("hidden")
          successCard.classList.remove("hidden")
        }
      }, 1500)
    })
  }

  if (tryAgainButton) {
    tryAgainButton.addEventListener("click", () => {
      if (forgotPasswordCard && successCard) {
        successCard.classList.add("hidden")
        forgotPasswordCard.classList.remove("hidden")

        // Resetar formulário
        const form = document.getElementById("forgotPasswordForm")
        if (form) {
          form.reset()
        }

        // Resetar estado do botão
        toggleLoader("resetButton", false)
      }
    })
  }

  // Validação em tempo real para e-mail
  const emailInputs = document.querySelectorAll('input[type="email"]')
  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      const email = this.value.trim()
      if (email && !isValidEmail(email)) {
        this.style.borderColor = "var(--error)"
      } else {
        this.style.borderColor = "var(--border-color)"
      }
    })

    input.addEventListener("focus", function () {
      this.style.borderColor = "var(--primary)"
    })
  })

  // Função para validar e-mail
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Animação de entrada para os cards
  const authCards = document.querySelectorAll(".auth-card")
  authCards.forEach((card, index) => {
    card.style.animationDelay = index * 0.1 + "s"
  })

  // Efeito de hover nos inputs
  const inputs = document.querySelectorAll("input")
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateY(-1px)"
    })

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateY(0)"
    })
  })

  // Exibir quantidade de usuários cadastrados (apenas para demonstração)
  console.log(`Total de usuários cadastrados: ${users.length}`)
})
