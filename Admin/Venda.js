// Função para alternar a classe 'open' na sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  sidebar.classList.toggle("open")
}

// Função para mostrar/ocultar o menu de opções do usuário
function toggleProfileOptions() {
  const profileOptions = document.getElementById("profileOptions")
  profileOptions.classList.toggle("show")
}

document.addEventListener("DOMContentLoaded", () => {
  const usuario = "João da Silva"
  const hoje = new Date().toLocaleDateString("pt-BR")
  document.getElementById("nomeUsuario").textContent = usuario
  document.getElementById("dataVenda").textContent = hoje
})

// Recupera os produtos do localStorage e transforma em objeto indexado por código
const lista = JSON.parse(localStorage.getItem("produtosCadastrados")) || [
  {
    codigo: 1,
    nome: "Maçã Fuji",
    descricao: "Maçã fresca e crocante",
    preco: 3.5,
    quantidade: 100,
    categoria: "Hortifruti",
  },
  {
    codigo: 2,
    nome: "Leite Integral",
    descricao: "Leite de vaca pasteurizado 1L",
    preco: 4.9,
    quantidade: 50,
    categoria: "Laticinios",
  },
  {
    codigo: 3,
    nome: "Pão Francês",
    descricao: "Pão crocante de padaria",
    preco: 0.5,
    quantidade: 200,
    categoria: "Padaria",
  },
  {
    codigo: 4,
    nome: "Detergente Neutro",
    descricao: "Detergente para louças 500ml",
    preco: 2.3,
    quantidade: 80,
    categoria: "Limpeza",
  },
  {
    codigo: 5,
    nome: "Shampoo Anticaspa",
    descricao: "Shampoo 350ml com ação anticaspa",
    preco: 12.99,
    quantidade: 40,
    categoria: "Higiene Pessoal",
  },
  {
    codigo: 6,
    nome: "Ração para Cães",
    descricao: "Ração seca para cães adultos 10kg",
    preco: 89.9,
    quantidade: 25,
    categoria: "Pet Shop",
  },
  {
    codigo: 7,
    nome: "Feijão Carioca",
    descricao: "Feijão tipo 1 - pacote 1kg",
    preco: 7.8,
    quantidade: 60,
    categoria: "Mercearia",
  },
  {
    codigo: 8,
    nome: "Refrigerante Cola",
    descricao: "Refrigerante sabor cola 2L",
    preco: 6.5,
    quantidade: 90,
    categoria: "Bebidas",
  },
]

const produtos = {}
lista.forEach((p) => {
  produtos[p.codigo] = {
    nome: p.nome,
    preco: p.preco,
    quantidade: p.quantidade,
  }
})

let listaProdutos = []

function salvarProdutos() {
  // Atualiza a lista com os dados do objeto produtos
  for (let i = 0; i < lista.length; i++) {
    const codigo = lista[i].codigo
    if (produtos[codigo]) {
      lista[i].quantidade = produtos[codigo].quantidade
    }
  }

  // Agora salva no localStorage com as quantidades atualizadas
  localStorage.setItem("produtosCadastrados", JSON.stringify(lista))
}

function adicionarProduto() {
  const codigo = document.getElementById("codigoProduto").value.trim()
  const peso = Number.parseFloat(document.getElementById("peso").value)
  const quantidade = Number.parseInt(document.getElementById("quantidade").value)
  const desconto = Number.parseFloat(document.getElementById("desconto").value) || 0
  const percentualDesconto = desconto > 0 ? desconto / 100 : 0

  if (!produtos[codigo]) {
    alert("Produto não encontrado!")
    return
  }

  const produto = produtos[codigo]

  let tipoVenda = "" // "peso" ou "quantidade"
  let quantidadeVendida = 0
  let total = 0

  if (!isNaN(peso) && peso > 0) {
    // Venda por peso
    tipoVenda = "peso"
    if (peso > produto.quantidade) {
      alert(`Estoque insuficiente! Restam apenas ${produto.quantidade} kg.`)
      return
    }
    quantidadeVendida = peso
    total = produto.preco * peso * (1 - percentualDesconto)
    produto.quantidade -= peso
  } else if (!isNaN(quantidade) && quantidade > 0) {
    // Venda por unidade
    tipoVenda = "quantidade"
    if (quantidade > produto.quantidade) {
      alert(`Estoque insuficiente! Restam apenas ${produto.quantidade} unidades.`)
      return
    }
    quantidadeVendida = quantidade
    total = produto.preco * quantidade * (1 - percentualDesconto)
    produto.quantidade -= quantidade
  } else {
    alert("Informe uma quantidade ou peso válidos!")
    return
  }

  listaProdutos.push({
    descricao: produto.nome,
    quantidade: quantidadeVendida,
    unitario: produto.preco,
    total: total,
    tipoVenda: tipoVenda,
    desconto: desconto,
  })

  atualizarTabela()
  limparCampos()
  calcularSubtotal()
  salvarProdutos()
}

function atualizarTabela() {
  const tbody = document.getElementById("tabelaProdutos")
  tbody.innerHTML = ""

  listaProdutos.forEach((item, index) => {
    const linha = document.createElement("tr")
    linha.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.descricao}</td>
            <td>${item.quantidade} ${item.tipoVenda === "peso" ? "kg" : "un"}</td>
            <td>R$ ${item.unitario.toFixed(2).replace(".", ",")}</td>
            <td>R$ ${item.total.toFixed(2).replace(".", ",")}</td>
            <td><button class="btn-excluir" onclick="excluirProduto(${index})">Excluir</button></td>
        `
    tbody.appendChild(linha)
  })
}

function limparCampos() {
  document.getElementById("codigoProduto").value = ""
  document.getElementById("peso").value = ""
  document.getElementById("quantidade").value = ""
  document.getElementById("desconto").value = ""
  document.getElementById("codigoProduto").focus()
}

function calcularSubtotal() {
  const subtotal = listaProdutos.reduce((acc, item) => acc + item.total, 0)
  document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`
  calcularTroco()
}

function calcularTroco() {
  const subtotal = listaProdutos.reduce((acc, item) => acc + item.total, 0)
  const valorPago = Number.parseFloat(document.getElementById("valorPago").value.replace(",", ".")) || 0
  const troco = valorPago - subtotal

  document.getElementById("troco").textContent = troco >= 0 ? `R$ ${troco.toFixed(2).replace(".", ",")}` : "R$ 0,00"
}

document.querySelector(".produto-form").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault()
    adicionarProduto()
  }
})

function excluirProduto(index) {
  const confirmacao = confirm("Tem certeza que deseja excluir este produto?")
  if (!confirmacao) return

  const itemRemovido = listaProdutos[index]

  // Encontra o produto pelo nome
  const produtoCorrespondente = Object.entries(produtos).find(([codigo, prod]) => prod.nome === itemRemovido.descricao)

  if (produtoCorrespondente) {
    const codigoProduto = produtoCorrespondente[0]
    produtos[codigoProduto].quantidade += itemRemovido.quantidade
    salvarProdutos()
  }

  // Remove o item da venda
  listaProdutos.splice(index, 1)

  atualizarTabela()
  calcularSubtotal()
}

function excluirTodosProdutos() {
  const confirmacao = confirm("Tem certeza que deseja excluir todos os produtos da venda?")
  if (!confirmacao) return

  // Repor o estoque de cada item
  listaProdutos.forEach((item) => {
    const produtoCorrespondente = Object.entries(produtos).find(([codigo, prod]) => prod.nome === item.descricao)
    if (produtoCorrespondente) {
      const codigoProduto = produtoCorrespondente[0]
      produtos[codigoProduto].quantidade += item.quantidade
    }
  })

  // Limpa a lista de produtos da venda
  listaProdutos = []

  // Atualiza a interface e salva os dados
  atualizarTabela()
  calcularSubtotal()
  salvarProdutos()
}

// Função para gerar ID único da venda
function gerarIdVenda() {
  const vendas = JSON.parse(localStorage.getItem("historicoVendas")) || []
  const proximoNumero = vendas.length + 1
  return `V${String(proximoNumero).padStart(3, "0")}`
}

// Função para salvar venda no histórico
function salvarVendaNoHistorico(dadosVenda) {
  const vendas = JSON.parse(localStorage.getItem("historicoVendas")) || []
  vendas.unshift(dadosVenda) // Adiciona no início da lista
  localStorage.setItem("historicoVendas", JSON.stringify(vendas))
}

// Função para gerar relatório
function gerarRelatorio(dadosVenda) {
  let produtosHtml = ""
  dadosVenda.produtos.forEach((item, index) => {
    produtosHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nome}</td>
                <td>${item.quantidade} ${item.tipoVenda === "peso" ? "kg" : "un"}</td>
                <td>R$ ${item.unitario.toFixed(2).replace(".", ",")}</td>
                <td>R$ ${item.total.toFixed(2).replace(".", ",")}</td>
            </tr>
        `
  })

  const relatorio = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Comprovante de Venda - ${dadosVenda.id}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .relatorio-venda {
                    background-color: #fff;
                    padding: 30px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                .relatorio-header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #eee;
                }
                .relatorio-header h2 {
                    color: #004f8b;
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .relatorio-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 25px;
                }
                .relatorio-info div {
                    flex: 1;
                }
                .relatorio-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                .relatorio-table th {
                    background-color: #004f8b;
                    color: white;
                    padding: 12px;
                    text-align: left;
                }
                .relatorio-table td {
                    padding: 12px;
                    border-bottom: 1px solid #eee;
                }
                .relatorio-table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                .relatorio-footer {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 2px solid #eee;
                }
                .relatorio-total {
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                .relatorio-total.grand {
                    font-size: 20px;
                    font-weight: bold;
                    color: #004f8b;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px dashed #ccc;
                }
                .relatorio-agradecimento {
                    text-align: center;
                    margin-top: 30px;
                    font-style: italic;
                    color: #666;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                    .relatorio-venda {
                        box-shadow: none;
                        padding: 0;
                    }
                    .no-print {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="relatorio-venda">
                <div class="relatorio-header">
                    <h2>Comprovante de Venda</h2>
                    <p>Evolvix Sistema de Gestão</p>
                    <p><strong>Venda ID:</strong> ${dadosVenda.id}</p>
                </div>
                
                <div class="relatorio-info">
                    <div>
                        <p><strong>Cliente:</strong> ${dadosVenda.cliente || "Cliente não identificado"}</p>
                        <p><strong>Vendedor:</strong> ${dadosVenda.vendedor}</p>
                    </div>
                    <div>
                        <p><strong>Data:</strong> ${dadosVenda.dataFormatada}</p>
                        <p><strong>Hora:</strong> ${dadosVenda.hora}</p>
                    </div>
                </div>
                
                <table class="relatorio-table">
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
                        ${produtosHtml}
                    </tbody>
                </table>
                
                <div class="relatorio-footer">
                    <div class="relatorio-total">
                        <span>Subtotal:</span>
                        <span>R$ ${dadosVenda.total.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div class="relatorio-total">
                        <span>Valor Pago:</span>
                        <span>R$ ${dadosVenda.valorPago.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div class="relatorio-total grand">
                        <span>Troco:</span>
                        <span>R$ ${dadosVenda.troco.toFixed(2).replace(".", ",")}</span>
                    </div>
                </div>
                
                <div class="relatorio-agradecimento">
                    <p>Agradecemos pela preferência!</p>
                    <p>Volte sempre.</p>
                </div>
            </div>
            
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #004f8b; color: white; border: none; border-radius: 4px; cursor: pointer;">Imprimir Comprovante</button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Fechar</button>
            </div>
        </body>
        </html>
    `

  const win = window.open("", "_blank")
  win.document.write(relatorio)
  win.document.close()
}

function finalizarCompra() {
  if (listaProdutos.length === 0) {
    alert("Nenhum produto adicionado à venda.")
    return
  }

  const valorPagoStr = document.getElementById("valorPago").value.trim()
  if (!valorPagoStr) {
    alert("Digite o valor pago pelo cliente.")
    document.getElementById("valorPago").focus()
    return
  }

  const valorPago = Number.parseFloat(valorPagoStr.replace(",", "."))
  if (isNaN(valorPago) || valorPago <= 0) {
    alert("Valor pago inválido.")
    document.getElementById("valorPago").focus()
    return
  }

  const nomeCliente = document.getElementById("cliente").value
  const nomeVendedor = document.getElementById("nomeUsuario").textContent
  const data = new Date()
  const dataFormatada = data.toLocaleDateString("pt-BR")
  const hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  const subtotal = listaProdutos.reduce((acc, item) => acc + item.total, 0)
  const troco = valorPago - subtotal

  if (troco < 0) {
    alert(`Valor pago insuficiente. Faltam R$ ${Math.abs(troco).toFixed(2).replace(".", ",")}.`)
    return
  }

  // Preparar dados da venda
  const dadosVenda = {
    id: gerarIdVenda(),
    data: data.toISOString().split("T")[0], // formato YYYY-MM-DD
    dataFormatada: dataFormatada,
    hora: hora,
    cliente: nomeCliente || "Cliente não identificado",
    vendedor: nomeVendedor,
    total: subtotal,
    valorPago: valorPago,
    troco: troco,
    status: "finalizada",
    produtos: listaProdutos.map((item) => ({
      nome: item.descricao,
      quantidade: item.quantidade,
      unitario: item.unitario,
      total: item.total,
      tipoVenda: item.tipoVenda,
    })),
  }

  // Salvar no histórico
  salvarVendaNoHistorico(dadosVenda)

  // Perguntar se quer gerar o relatório
  const gerarRel = confirm("Venda finalizada com sucesso!\n\nDeseja gerar o relatório da venda?")

  if (gerarRel) {
    gerarRelatorio(dadosVenda)
  }

  // Limpar a venda atual
  listaProdutos = []
  atualizarTabela()
  calcularSubtotal()
  document.getElementById("valorPago").value = ""
  document.getElementById("troco").textContent = "R$ 0,00"
  document.getElementById("cliente").value = ""

  alert("Venda salva no histórico com sucesso!")
}
