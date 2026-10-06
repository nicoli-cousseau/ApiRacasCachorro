/**
 * ============================================================================
 * Demonstração - Catálogo de Raças de Cachorros
 * JavaScript Puro (Vanilla JS) - Sem dependências externas
 * 
 * ATENÇÃO / CONTEXTO:
 * Esta interface opera estritamente em MODO DE DEMONSTRAÇÃO LOCAL.
 * NÃO realiza chamadas HTTP (como fetch ou XMLHttpRequest) para os endpoints
 * da API backend. Todos os dados são simulados em memória nesta página.
 * ============================================================================
 */

(function () {
  'use strict';

  // Conjunto inicial de dados fictícios para demonstração
  const racasDemonstracao = [
    {
      id: 1,
      nome: 'Labrador Retriever',
      grupo: 'Esportivo',
      porte: 'Grande',
      temperamento: 'Amigável, ativo, gosta de água',
      paisOrigem: 'Canadá',
      expectativaVidaAnos: 12
    },
    {
      id: 2,
      nome: 'Pug',
      grupo: 'Companhia',
      porte: 'Pequeno',
      temperamento: 'Afetuoso, brincalhão, teimoso',
      paisOrigem: 'China',
      expectativaVidaAnos: 14
    },
    {
      id: 3,
      nome: 'Border Collie',
      grupo: 'Pastoreio',
      porte: 'Médio',
      temperamento: 'Inteligente, energético, obediente',
      paisOrigem: 'Reino Unido',
      expectativaVidaAnos: 13
    },
    {
      id: 4,
      nome: 'Bulldog Francês',
      grupo: 'Companhia',
      porte: 'Pequeno',
      temperamento: 'Calmo, sociável, adaptável',
      paisOrigem: 'França',
      expectativaVidaAnos: 11
    }
  ];

  // Elementos do DOM
  const formRaca = document.getElementById('form-raca');
  const listaRacasElemento = document.getElementById('lista-racas');
  const contadorRacasElemento = document.getElementById('contador-racas');
  const mensagemStatusElemento = document.getElementById('mensagem-status');

  let temporizadorMensagem = null;

  /**
   * Sanitiza strings para evitar injeção acidental de HTML
   */
  function escaparHtml(texto) {
    if (typeof texto !== 'string') return texto;
    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Exibe mensagens de status na interface com suporte a leitores de tela
   */
  function exibirMensagem(texto, tipo = 'sucesso') {
    if (temporizadorMensagem) {
      clearTimeout(temporizadorMensagem);
    }

    mensagemStatusElemento.textContent = texto;
    mensagemStatusElemento.className = `mensagem-status ${tipo}`;
    mensagemStatusElemento.classList.remove('oculta');

    temporizadorMensagem = setTimeout(() => {
      mensagemStatusElemento.classList.add('oculta');
      mensagemStatusElemento.textContent = '';
    }, 6000);
  }

  /**
   * Atualiza o contador de raças exibidas
   */
  function atualizarContador() {
    const total = racasDemonstracao.length;
    contadorRacasElemento.textContent = total === 1 ? '1 raça listada' : `${total} raças listadas`;
  }

  /**
   * Renderiza a lista de raças na interface
   */
  function renderizarRacas() {
    listaRacasElemento.innerHTML = '';

    if (racasDemonstracao.length === 0) {
      const elementoVazio = document.createElement('div');
      elementoVazio.className = 'estado-vazio';
      elementoVazio.textContent = 'Nenhuma raça cadastrada na demonstração local.';
      listaRacasElemento.appendChild(elementoVazio);
      atualizarContador();
      return;
    }

    racasDemonstracao.forEach((raca) => {
      const card = document.createElement('article');
      card.className = 'card-raca';
      card.setAttribute('role', 'listitem');

      card.innerHTML = `
        <header class="card-cabecalho">
          <h3 class="card-nome">${escaparHtml(raca.nome)}</h3>
          <span class="badge-porte">${escaparHtml(raca.porte)}</span>
        </header>

        <ul class="card-dados">
          <li>
            <span class="card-rotulo">Grupo:</span>
            <span class="card-valor">${escaparHtml(raca.grupo)}</span>
          </li>
          <li>
            <span class="card-rotulo">Temperamento:</span>
            <span class="card-valor">${escaparHtml(raca.temperamento)}</span>
          </li>
          <li>
            <span class="card-rotulo">País de Origem:</span>
            <span class="card-valor">${escaparHtml(raca.paisOrigem)}</span>
          </li>
          <li>
            <span class="card-rotulo">Expectativa de Vida:</span>
            <span class="card-valor">${escaparHtml(String(raca.expectativaVidaAnos))} anos</span>
          </li>
        </ul>

        <footer class="card-rodape">
          <span>ID Simulado: #${raca.id}</span>
          <span class="tag-ficticio">Dado local</span>
        </footer>
      `;

      listaRacasElemento.appendChild(card);
    });

    atualizarContador();
  }

  /**
   * Trata o envio do formulário em modo puramente demonstrativo
   */
  function manipularSubmissao(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const grupo = document.getElementById('grupo').value.trim();
    const porte = document.getElementById('porte').value;
    const temperamento = document.getElementById('temperamento').value.trim();
    const paisOrigem = document.getElementById('paisOrigem').value.trim();
    const expectativaVidaAnosValor = document.getElementById('expectativaVidaAnos').value.trim();
    const expectativaVidaAnos = parseInt(expectativaVidaAnosValor, 10);

    // Validação visual de preenchimento
    if (!nome || !grupo || !porte || !temperamento || !paisOrigem || isNaN(expectativaVidaAnos)) {
      exibirMensagem('Por favor, preencha todos os campos obrigatórios corretamente.', 'erro');
      return;
    }

    if (expectativaVidaAnos <= 0 || expectativaVidaAnos > 35) {
      exibirMensagem('A expectativa de vida deve ser um número válido entre 1 e 35 anos.', 'erro');
      return;
    }

    // Criar novo registro fictício em memória local
    const novoId = racasDemonstracao.length > 0 
      ? Math.max(...racasDemonstracao.map(r => r.id)) + 1 
      : 1;

    const novaRaca = {
      id: novoId,
      nome,
      grupo,
      porte,
      temperamento,
      paisOrigem,
      expectativaVidaAnos
    };

    // Adiciona ao início da lista local para facilitar a visualização
    racasDemonstracao.unshift(novaRaca);

    // Atualiza a visualização e limpa os campos
    renderizarRacas();
    formRaca.reset();

    // Mensagem de sucesso evidenciando a natureza local da demonstração
    exibirMensagem(`Raça "${nome}" adicionada com sucesso na demonstração! (Armazenamento temporário em memória local, sem persistência na API).`, 'sucesso');
  }

  // Inicialização dos eventos
  formRaca.addEventListener('submit', manipularSubmissao);

  // Renderização inicial
  renderizarRacas();
})();
