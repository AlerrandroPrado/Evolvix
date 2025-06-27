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

// Dados de exemplo para vendas - pré-cadastrados
const VENDAS_PADRAO = [
  {
    id: "V012",
    data: "2024-01-15",
    hora: "14:30",
    cliente: "João da Silva",
    vendedor: "Maria Santos",
    total: 127.5,
    valorPago: 130.0,
    troco: 2.5,
    status: "finalizada",
    produtos: [
      {
        nome: "Maçã Fuji",
        quantidade: 2,
        unitario: 3.5,
        total: 7.0,
        tipoVenda: "quantidade",
      },
      {
        nome: "Leite Integral",
        quantidade: 3,
        unitario: 4.9,
        total: 14.7,
        tipoVenda: "quantidade",
      },
      {
        nome: "Pão Francês",
        quantidade: 10,
        unitario: 0.5,
        total: 5.0,
        tipoVenda: "quantidade",
      },
      {
        nome: "Detergente Neutro",
        quantidade: 2,
        unitario: 2.3,
        total: 4.6,
        tipoVenda: "quantidade",
      },
      {
        nome: "Shampoo Anticaspa",
        quantidade: 1,
        unitario: 12.99,
        total: 12.99,
        tipoVenda: "quantidade",
      },
      {
        nome: "Feijão Carioca",
        quantidade: 5,
        unitario: 7.8,
        total: 39.0,
        tipoVenda: "quantidade",
      },
      {
        nome: "Refrigerante Cola",
        quantidade: 7,
        unitario: 6.5,
        total: 45.5,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V011",
    data: "2024-01-15",
    hora: "16:45",
    cliente: "Maria Oliveira",
    vendedor: "João Silva",
    total: 89.9,
    valorPago: 100.0,
    troco: 10.1,
    status: "finalizada",
    produtos: [
      {
        nome: "Ração para Cães",
        quantidade: 1,
        unitario: 89.9,
        total: 89.9,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V010",
    data: "2024-01-14",
    hora: "10:15",
    cliente: "Carlos Mendes",
    vendedor: "Ana Costa",
    total: 45.8,
    valorPago: 0,
    troco: 0,
    status: "finalizada",
    produtos: [
      {
        nome: "Detergente Neutro",
        quantidade: 2,
        unitario: 2.3,
        total: 4.6,
        tipoVenda: "quantidade",
      },
      {
        nome: "Shampoo Anticaspa",
        quantidade: 1,
        unitario: 12.99,
        total: 12.99,
        tipoVenda: "quantidade",
      },
      {
        nome: "Feijão Carioca",
        quantidade: 2,
        unitario: 7.8,
        total: 15.6,
        tipoVenda: "quantidade",
      },
      {
        nome: "Refrigerante Cola",
        quantidade: 2,
        unitario: 6.5,
        total: 13.0,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V009",
    data: "2024-01-14",
    hora: "09:20",
    cliente: "Fernanda Costa",
    vendedor: "Pedro Alves",
    total: 13.0,
    valorPago: 15.0,
    troco: 2.0,
    status: "finalizada",
    produtos: [
      {
        nome: "Refrigerante Cola",
        quantidade: 2,
        unitario: 6.5,
        total: 13.0,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V008",
    data: "2024-01-13",
    hora: "15:30",
    cliente: "Roberto Silva",
    vendedor: "Lucia Ferreira",
    total: 234.7,
    valorPago: 250.0,
    troco: 15.3,
    status: "finalizada",
    produtos: [
      {
        nome: "Maçã Fuji",
        quantidade: 5,
        unitario: 3.5,
        total: 17.5,
        tipoVenda: "quantidade",
      },
      {
        nome: "Leite Integral",
        quantidade: 10,
        unitario: 4.9,
        total: 49.0,
        tipoVenda: "quantidade",
      },
      {
        nome: "Feijão Carioca",
        quantidade: 8,
        unitario: 7.8,
        total: 62.4,
        tipoVenda: "quantidade",
      },
      {
        nome: "Ração para Cães",
        quantidade: 1,
        unitario: 89.9,
        total: 89.9,
        tipoVenda: "quantidade",
      },
      {
        nome: "Pão Francês",
        quantidade: 32,
        unitario: 0.5,
        total: 16.0,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V007",
    data: "2024-01-12",
    hora: "11:45",
    cliente: "Ana Paula Santos",
    vendedor: "Carlos Santos",
    total: 67.89,
    valorPago: 70.0,
    troco: 2.11,
    status: "finalizada",
    produtos: [
      {
        nome: "Shampoo Anticaspa",
        quantidade: 3,
        unitario: 12.99,
        total: 38.97,
        tipoVenda: "quantidade",
      },
      {
        nome: "Detergente Neutro",
        quantidade: 5,
        unitario: 2.3,
        total: 11.5,
        tipoVenda: "quantidade",
      },
      {
        nome: "Maçã Fuji",
        quantidade: 5,
        unitario: 3.5,
        total: 17.5,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V006",
    data: "2024-01-12",
    hora: "08:30",
    cliente: "Eduardo Pereira",
    vendedor: "Maria Santos",
    total: 156.8,
    valorPago: 160.0,
    troco: 3.2,
    status: "finalizada",
    produtos: [
      {
        nome: "Ração para Cães",
        quantidade: 1,
        unitario: 89.9,
        total: 89.9,
        tipoVenda: "quantidade",
      },
      {
        nome: "Leite Integral",
        quantidade: 8,
        unitario: 4.9,
        total: 39.2,
        tipoVenda: "quantidade",
      },
      {
        nome: "Pão Francês",
        quantidade: 20,
        unitario: 0.5,
        total: 10.0,
        tipoVenda: "quantidade",
      },
      {
        nome: "Maçã Fuji",
        quantidade: 5,
        unitario: 3.5,
        total: 17.7,
        tipoVenda: "peso",
      },
    ],
  },
  {
    id: "V005",
    data: "2024-01-11",
    hora: "17:15",
    cliente: "Patrícia Lima",
    vendedor: "João Silva",
    total: 78.45,
    valorPago: 80.0,
    troco: 1.55,
    status: "finalizada",
    produtos: [
      {
        nome: "Feijão Carioca",
        quantidade: 3,
        unitario: 7.8,
        total: 23.4,
        tipoVenda: "quantidade",
      },
      {
        nome: "Refrigerante Cola",
        quantidade: 4,
        unitario: 6.5,
        total: 26.0,
        tipoVenda: "quantidade",
      },
      {
        nome: "Shampoo Anticaspa",
        quantidade: 1,
        unitario: 12.99,
        total: 12.99,
        tipoVenda: "quantidade",
      },
      {
        nome: "Detergente Neutro",
        quantidade: 7,
        unitario: 2.3,
        total: 16.1,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V004",
    data: "2024-01-11",
    hora: "13:20",
    cliente: "Ricardo Almeida",
    vendedor: "Ana Costa",
    total: 32.5,
    valorPago: 0,
    troco: 0,
    status: "finalizada",
    produtos: [
      {
        nome: "Refrigerante Cola",
        quantidade: 5,
        unitario: 6.5,
        total: 32.5,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V003",
    data: "2024-01-10",
    hora: "16:00",
    cliente: "Juliana Rodrigues",
    vendedor: "Pedro Alves",
    total: 198.75,
    valorPago: 200.0,
    troco: 1.25,
    status: "finalizada",
    produtos: [
      {
        nome: "Ração para Cães",
        quantidade: 2,
        unitario: 89.9,
        total: 179.8,
        tipoVenda: "quantidade",
      },
      {
        nome: "Maçã Fuji",
        quantidade: 2.5,
        unitario: 3.5,
        total: 8.75,
        tipoVenda: "peso",
      },
      {
        nome: "Pão Francês",
        quantidade: 20,
        unitario: 0.5,
        total: 10.0,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V002",
    data: "2024-01-10",
    hora: "12:45",
    cliente: "Marcos Vieira",
    vendedor: "Lucia Ferreira",
    total: 95.6,
    valorPago: 100.0,
    troco: 4.4,
    status: "finalizada",
    produtos: [
      {
        nome: "Feijão Carioca",
        quantidade: 6,
        unitario: 7.8,
        total: 46.8,
        tipoVenda: "quantidade",
      },
      {
        nome: "Leite Integral",
        quantidade: 10,
        unitario: 4.9,
        total: 49.0,
        tipoVenda: "quantidade",
      },
    ],
  },
  {
    id: "V001",
    data: "2024-01-09",
    hora: "14:10",
    cliente: "Camila Souza",
    vendedor: "Carlos Santos",
    total: 41.47,
    valorPago: 45.0,
    troco: 3.53,
    status: "finalizada",
    produtos: [
      {
        nome: "Shampoo Anticaspa",
        quantidade: 2,
        unitario: 12.99,
        total: 25.98,
        tipoVenda: "quantidade",
      },
      {
        nome: "Detergente Neutro",
        quantidade: 3,
        unitario: 2.3,
        total: 6.9,
        tipoVenda: "quantidade",
      },
      {
        nome: "Refrigerante Cola",
        quantidade: 1,
        unitario: 6.5,
        total: 6.5,
        tipoVenda: "quantidade",
      },
      {
        nome: "Pão Francês",
        quantidade: 4,
        unitario: 0.5,
        total: 2.0,
        tipoVenda: "quantidade",
      },
    ],
  },
]

// Função para carregar vendas do localStorage
function carregarVendas() {
  const vendasSalvas = localStorage.getItem("historicoVendas")
  if (vendasSalvas) {
    return JSON.parse(vendasSalvas)
  } else {
    // Salva as vendas padrão no localStorage e retorna elas
    localStorage.setItem("historicoVendas", JSON.stringify(VENDAS_PADRAO))
    return VENDAS_PADRAO
  }
}

// Função para salvar vendas no localStorage
function salvarVendas(vendas) {
  localStorage.setItem("historicoVendas", JSON.stringify(vendas))
}

// Função para visualizar detalhes da venda
function visualizarVenda(id) {
  const vendas = carregarVendas()
  const venda = vendas.find((v) => v.id === id)

  if (venda) {
    const modal = document.getElementById("modalDetalhes")
    const conteudo = document.getElementById("conteudoModal")

    let produtosHtml = ""
    venda.produtos.forEach((produto) => {
      produtosHtml += `
                <tr>
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>R$ ${produto.unitario.toFixed(2).replace(".", ",")}</td>
                    <td>R$ ${produto.total.toFixed(2).replace(".", ",")}</td>
                </tr>
            `
    })

    conteudo.innerHTML = `
            <div class="detalhes-venda">
                <h2>Detalhes da Venda ${venda.id}</h2>
                
                <div class="detalhes-header">
                    <div>
                        <p><strong>Cliente:</strong> ${venda.cliente}</p>
                        <p><strong>Vendedor:</strong> ${venda.vendedor}</p>
                    </div>
                    <div>
                        <p><strong>Data:</strong> ${new Date(venda.data).toLocaleDateString("pt-BR")}</p>
                        <p><strong>Hora:</strong> ${venda.hora}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${venda.status}">${venda.status}</span></p>
                    </div>
                </div>
                
                <table class="detalhes-table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Unitário</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${produtosHtml}
                    </tbody>
                </table>
                
                <div class="detalhes-footer">
                    <p class="total-venda"><strong>Total: R$ ${venda.total.toFixed(2).replace(".", ",")}</strong></p>
                    <p>Valor Pago: R$ ${venda.valorPago.toFixed(2).replace(".", ",")}</p>
                    <p>Troco: R$ ${venda.troco.toFixed(2).replace(".", ",")}</p>
                </div>
            </div>
        `

    modal.classList.remove("hidden")
  }
}

// Função para fechar modal
function fecharModal() {
  const modal = document.getElementById("modalDetalhes")
  modal.classList.add("hidden")
}

// Função para carregar lista de vendas na tabela
function carregarListaVendas(vendasFiltradas = null) {
  const vendas = vendasFiltradas || carregarVendas()
  const tbody = document.getElementById("listaVendas")
  tbody.innerHTML = ""

  vendas.forEach((venda) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
            <td>${venda.id}</td>
            <td>${new Date(venda.data).toLocaleDateString("pt-BR")} ${venda.hora}</td>
            <td>${venda.cliente}</td>
            <td>${venda.vendedor}</td>
            <td>R$ ${venda.total.toFixed(2).replace(".", ",")}</td>
            <td><span class="status-badge status-${venda.status}">${venda.status}</span></td>
            <td>
                <button class="btn-visualizar" onclick="visualizarVenda('${venda.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                <button class="btn-download" onclick="baixarRelatorio('${venda.id}')">
                    <i class="fas fa-download"></i> Relatório
                </button>
            </td>
        `
    tbody.appendChild(tr)
  })
}

// Função para aplicar filtros
function aplicarFiltro() {
  const termo = document.getElementById("busca").value.toLowerCase()
  const statusFiltro = document.getElementById("filtroStatus").value
  const dataFiltro = document.getElementById("filtroData").value

  const vendas = carregarVendas()

  const filtradas = vendas.filter((venda) => {
    const textoVenda = `${venda.cliente} ${venda.vendedor} ${venda.id}`.toLowerCase()
    const matchTexto = textoVenda.includes(termo)
    const matchStatus = statusFiltro ? venda.status === statusFiltro : true
    const matchData = dataFiltro ? venda.data === dataFiltro : true

    return matchTexto && matchStatus && matchData
  })

  carregarListaVendas(filtradas)
}

// Função para baixar relatório de uma venda específica
function baixarRelatorio(id) {
  const vendas = carregarVendas()
  const venda = vendas.find((v) => v.id === id)

  if (!venda) {
    alert("Venda não encontrada!")
    return
  }

  let produtosHtml = ""
  venda.produtos.forEach((produto, index) => {
    produtosHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${produto.nome}</td>
                <td>${produto.quantidade} ${produto.tipoVenda === "peso" ? "kg" : "un"}</td>
                <td>R$ ${produto.unitario.toFixed(2).replace(".", ",")}</td>
                <td>R$ ${produto.total.toFixed(2).replace(".", ",")}</td>
            </tr>
        `
  })

  const relatorio = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Relatório de Venda - ${venda.id}</title>
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
                    <h2>Relatório de Venda</h2>
                    <p>Evolvix Sistema de Gestão</p>
                    <p><strong>Venda ID:</strong> ${venda.id}</p>
                </div>
                
                <div class="relatorio-info">
                    <div>
                        <p><strong>Cliente:</strong> ${venda.cliente}</p>
                        <p><strong>Vendedor:</strong> ${venda.vendedor}</p>
                    </div>
                    <div>
                        <p><strong>Data:</strong> ${new Date(venda.data).toLocaleDateString("pt-BR")}</p>
                        <p><strong>Hora:</strong> ${venda.hora}</p>
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
                        <span>R$ ${venda.total.toFixed(2).replace(".", ",")}</span>
                    </div>
                    ${
                      venda.status === "finalizada"
                        ? `
                        <div class="relatorio-total">
                            <span>Valor Pago:</span>
                            <span>R$ ${venda.valorPago.toFixed(2).replace(".", ",")}</span>
                        </div>
                        <div class="relatorio-total grand">
                            <span>Troco:</span>
                            <span>R$ ${venda.troco.toFixed(2).replace(".", ",")}</span>
                        </div>
                    `
                        : ""
                    }
                </div>
                
                <div class="relatorio-agradecimento">
                    <p>Agradecemos pela preferência!</p>
                    <p>Volte sempre.</p>
                </div>
            </div>
            
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #004f8b; color: white; border: none; border-radius: 4px; cursor: pointer;">Imprimir</button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Fechar</button>
            </div>
        </body>
        </html>
    `

  const win = window.open("", "_blank")
  win.document.write(relatorio)
  win.document.close()
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  carregarListaVendas()

  // Filtros
  document.getElementById("busca").addEventListener("input", aplicarFiltro)
  document.getElementById("filtroStatus").addEventListener("change", aplicarFiltro)
  document.getElementById("filtroData").addEventListener("change", aplicarFiltro)

  // Fechar modal clicando fora
  document.getElementById("modalDetalhes").addEventListener("click", function (e) {
    if (e.target === this) {
      fecharModal()
    }
  })
})

// Função para adicionar nova venda ao histórico (será chamada da página de vendas)
function adicionarVendaAoHistorico(novaVenda) {
  const vendas = carregarVendas()
  vendas.unshift(novaVenda) // Adiciona no início da lista
  salvarVendas(vendas)
}
