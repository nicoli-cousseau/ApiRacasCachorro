/**
 * ============================================================================
 * Catálogo de Raças de Cachorros
 * JavaScript Puro (Vanilla JS) - Integração completa com a API
 * 
 * Endpoints mapeados a partir da collection Bruno:
 * - GET    /api/racas       -> Listar todas as raças (200 OK)
 * - GET    /api/racas/{id}  -> Buscar raça por ID (200 OK / 404 Not Found)
 * - POST   /api/racas       -> Cadastrar nova raça (201 Created)
 * - PUT    /api/racas/{id}  -> Atualizar raça existente (200 OK / 404 Not Found)
 * - DELETE /api/racas/{id}  -> Excluir raça (204 NoContent / 404 Not Found)
 * ============================================================================
 */

(function () {
  'use strict';

  // Configuração da URL da API (usa porta 5050 conforme launchSettings e Bruno)
  const API_BASE_URL = (window.location.protocol.startsWith('http') && window.location.port === '5050')
    ? '/api/racas'
    : 'http://localhost:5050/api/racas';

  // Estado da aplicação
  let editandoId = null;
  let temporizadorMensagem = null;

  // Elementos do DOM - Formulário
  const painelForm = document.getElementById('painel-form');
  const formRaca = document.getElementById('form-raca');
  const inputId = document.getElementById('raca-id');
  const inputNome = document.getElementById('nome');
  const inputGrupo = document.getElementById('grupo');
  const selectPorte = document.getElementById('porte');
  const inputTemperamento = document.getElementById('temperamento');
  const inputPaisOrigem = document.getElementById('paisOrigem');
  const inputExpectativaVida = document.getElementById('expectativaVidaAnos');
  const btnSubmit = document.getElementById('btn-submit');
  const btnCancelar = document.getElementById('btn-cancelar');
  const btnLimpar = document.getElementById('btn-limpar');
  const tituloFormulario = document.getElementById('titulo-formulario');
  const descricaoFormulario = document.getElementById('descricao-formulario');

  // Elementos do DOM - Listagem e Feedback
  const listaRacasElemento = document.getElementById('lista-racas');
  const contadorRacasElemento = document.getElementById('contador-racas');
  const mensagemStatusElemento = document.getElementById('mensagem-status');
  const indicadorCarregamento = document.getElementById('indicador-carregamento');
  const estadoVazioElemento = document.getElementById('estado-vazio');
  const btnRecarregar = document.getElementById('btn-recarregar');

  /**
   * Exibe mensagens de status na interface de forma acessível
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
    }, 7000);
  }

  /**
   * Atualiza o contador de raças na tela
   */
  function atualizarContador(total) {
    contadorRacasElemento.textContent = total === 1 ? '1 raça listada' : `${total} raças listadas`;
  }

  /**
   * Helper para criar itens de dados no cartão de raça
   * Insere valores com textContent estritamente
   */
  function criarItemDado(rotuloTexto, valorTexto) {
    const li = document.createElement('li');

    const rotulo = document.createElement('span');
    rotulo.className = 'card-rotulo';
    rotulo.textContent = rotuloTexto;

    const valor = document.createElement('span');
    valor.className = 'card-valor';
    valor.textContent = valorTexto;

    li.appendChild(rotulo);
    li.appendChild(valor);
    return li;
  }

  /**
   * Renderiza os registros recebidos da API no DOM
   * ATENÇÃO: Todos os dados da API são inseridos com textContent (sem innerHTML)
   */
  function renderizarRacas(racas) {
    listaRacasElemento.innerHTML = '';

    if (!Array.isArray(racas) || racas.length === 0) {
      estadoVazioElemento.classList.remove('oculta');
      atualizarContador(0);
      return;
    }

    estadoVazioElemento.classList.add('oculta');
    atualizarContador(racas.length);

    racas.forEach((raca) => {
      const card = document.createElement('article');
      card.className = 'card-raca';
      card.setAttribute('role', 'listitem');

      // Cabeçalho do Cartão
      const cabecalho = document.createElement('header');
      cabecalho.className = 'card-cabecalho';

      const nomeH3 = document.createElement('h3');
      nomeH3.className = 'card-nome';
      nomeH3.textContent = raca.nome || '(Sem nome)';

      const badgePorte = document.createElement('span');
      badgePorte.className = 'badge-porte';
      badgePorte.textContent = raca.porte || 'N/A';

      cabecalho.appendChild(nomeH3);
      cabecalho.appendChild(badgePorte);

      // Dados da Raça
      const ulDados = document.createElement('ul');
      ulDados.className = 'card-dados';

      ulDados.appendChild(criarItemDado('Grupo:', raca.grupo || 'N/A'));
      ulDados.appendChild(criarItemDado('Temperamento:', raca.temperamento || 'N/A'));
      ulDados.appendChild(criarItemDado('País de Origem:', raca.paisOrigem || 'N/A'));
      ulDados.appendChild(criarItemDado('Expectativa de Vida:', raca.expectativaVidaAnos != null ? `${raca.expectativaVidaAnos} anos` : 'N/A'));

      // Rodapé do Cartão com ID e Ações
      const rodape = document.createElement('footer');
      rodape.className = 'card-rodape';

      const idSpan = document.createElement('span');
      idSpan.className = 'card-id';
      idSpan.textContent = `ID: #${raca.id != null ? raca.id : '?'}`;

      const acoesDiv = document.createElement('div');
      acoesDiv.className = 'card-acoes';

      const btnEditar = document.createElement('button');
      btnEditar.type = 'button';
      btnEditar.className = 'btn-acao btn-editar';
      btnEditar.textContent = 'Editar';
      btnEditar.setAttribute('aria-label', `Editar raça ${raca.nome}`);
      btnEditar.addEventListener('click', () => iniciarEdicao(raca));

      const btnExcluir = document.createElement('button');
      btnExcluir.type = 'button';
      btnExcluir.className = 'btn-acao btn-excluir';
      btnExcluir.textContent = 'Excluir';
      btnExcluir.setAttribute('aria-label', `Excluir raça ${raca.nome}`);
      btnExcluir.addEventListener('click', () => confirmarExclusao(raca));

      acoesDiv.appendChild(btnEditar);
      acoesDiv.appendChild(btnExcluir);

      rodape.appendChild(idSpan);
      rodape.appendChild(acoesDiv);

      card.appendChild(cabecalho);
      card.appendChild(ulDados);
      card.appendChild(rodape);

      listaRacasElemento.appendChild(card);
    });
  }

  /**
   * Carrega a lista de raças da API (GET /api/racas)
   */
  async function carregarRacas() {
    indicadorCarregamento.classList.remove('oculta');
    estadoVazioElemento.classList.add('oculta');

    try {
      const resposta = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!resposta.ok) {
        throw new Error(`Falha na requisição (Status HTTP ${resposta.status}: ${resposta.statusText || 'Erro no servidor'}).`);
      }

      const dados = await resposta.json();
      renderizarRacas(dados);
    } catch (erro) {
      console.error('Erro ao carregar raças:', erro);
      listaRacasElemento.innerHTML = '';
      atualizarContador(0);
      exibirMensagem(`Não foi possível carregar as raças da API. Motivo: ${erro.message}. Verifique se a API está em execução em http://localhost:5050.`, 'erro');
    } finally {
      indicadorCarregamento.classList.add('oculta');
    }
  }

  /**
   * Prepara o formulário para edição de uma raça existente
   */
  function iniciarEdicao(raca) {
    editandoId = raca.id;
    inputId.value = raca.id;
    inputNome.value = raca.nome || '';
    inputGrupo.value = raca.grupo || '';
    selectPorte.value = raca.porte || '';
    inputTemperamento.value = raca.temperamento || '';
    inputPaisOrigem.value = raca.paisOrigem || '';
    inputExpectativaVida.value = raca.expectativaVidaAnos != null ? raca.expectativaVidaAnos : '';

    painelForm.classList.add('modo-edicao');
    tituloFormulario.textContent = `Editar Raça #${raca.id}`;
    descricaoFormulario.textContent = 'Altere as informações abaixo e clique em Salvar Alterações para atualizar na API.';
    btnSubmit.textContent = 'Salvar Alterações';
    btnCancelar.classList.remove('oculta');

    painelForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    inputNome.focus();
  }

  /**
   * Cancela a edição e volta ao estado de novo cadastro
   */
  function cancelarEdicao() {
    editandoId = null;
    formRaca.reset();
    inputId.value = '';

    painelForm.classList.remove('modo-edicao');
    tituloFormulario.textContent = 'Cadastrar Nova Raça';
    descricaoFormulario.textContent = 'Preencha os campos abaixo para cadastrar uma nova raça na API.';
    btnSubmit.textContent = 'Cadastrar Raça';
    btnCancelar.classList.add('oculta');
  }

  /**
   * Salva uma raça:
   * - Se editandoId estiver ativo: PUT /api/racas/{id}
   * - Caso contrário: POST /api/racas
   */
  async function manipularSubmissao(evento) {
    evento.preventDefault();

    const nome = inputNome.value.trim();
    const grupo = inputGrupo.value.trim();
    const porte = selectPorte.value;
    const temperamento = inputTemperamento.value.trim();
    const paisOrigem = inputPaisOrigem.value.trim();
    const expectativaVidaAnosValor = inputExpectativaVida.value.trim();
    const expectativaVidaAnos = parseInt(expectativaVidaAnosValor, 10);

    // Validação dos campos obrigatórios
    if (!nome || !grupo || !porte || !temperamento || !paisOrigem || isNaN(expectativaVidaAnos)) {
      exibirMensagem('Por favor, preencha todos os campos obrigatórios corretamente.', 'erro');
      return;
    }

    if (expectativaVidaAnos <= 0 || expectativaVidaAnos > 30) {
      exibirMensagem('A expectativa de vida deve ser um número inteiro entre 1 e 30 anos.', 'erro');
      return;
    }

    // Payload com exatamente as propriedades JSON validadas no Bruno
    const payload = {
      nome,
      grupo,
      porte,
      temperamento,
      paisOrigem,
      expectativaVidaAnos
    };

    btnSubmit.disabled = true;

    try {
      if (editandoId !== null) {
        // Fluxo de Atualização: PUT /api/racas/{id}
        const urlPut = `${API_BASE_URL}/${editandoId}`;
        const resposta = await fetch(urlPut, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!resposta.ok) {
          throw new Error(`Erro ao atualizar raça (Status HTTP ${resposta.status}: ${resposta.statusText || 'Não foi possível atualizar'}).`);
        }

        exibirMensagem(`Raça "${nome}" atualizada com sucesso na API!`, 'sucesso');
        cancelarEdicao();
      } else {
        // Fluxo de Cadastro: POST /api/racas
        const resposta = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!resposta.ok) {
          throw new Error(`Erro ao cadastrar raça (Status HTTP ${resposta.status}: ${resposta.statusText || 'Não foi possível cadastrar'}).`);
        }

        exibirMensagem(`Raça "${nome}" cadastrada com sucesso na API!`, 'sucesso');
        formRaca.reset();
      }

      // Recarrega os dados imediatamente após a gravação
      await carregarRacas();
    } catch (erro) {
      console.error('Erro na gravação da raça:', erro);
      exibirMensagem(erro.message, 'erro');
    } finally {
      btnSubmit.disabled = false;
    }
  }

  /**
   * Exclui uma raça: DELETE /api/racas/{id}
   */
  async function confirmarExclusao(raca) {
    const confirmou = window.confirm(`Deseja realmente excluir a raça "${raca.nome}" (ID: #${raca.id}) da API?`);
    if (!confirmou) return;

    try {
      const urlDelete = `${API_BASE_URL}/${raca.id}`;
      const resposta = await fetch(urlDelete, {
        method: 'DELETE'
      });

      if (!resposta.ok) {
        throw new Error(`Erro ao excluir raça (Status HTTP ${resposta.status}: ${resposta.statusText || 'Não foi possível remover'}).`);
      }

      exibirMensagem(`Raça "${raca.nome}" removida com sucesso da API!`, 'sucesso');

      // Se estava editando o item excluído, reseta o formulário
      if (editandoId === raca.id) {
        cancelarEdicao();
      }

      // Recarrega os dados imediatamente após a exclusão
      await carregarRacas();
    } catch (erro) {
      console.error('Erro ao excluir raça:', erro);
      exibirMensagem(erro.message, 'erro');
    }
  }

  // Event Listeners
  formRaca.addEventListener('submit', manipularSubmissao);
  btnCancelar.addEventListener('click', cancelarEdicao);
  btnLimpar.addEventListener('click', () => {
    if (editandoId !== null) {
      cancelarEdicao();
    }
  });
  btnRecarregar.addEventListener('click', carregarRacas);

  // Inicialização: carrega dados da API ao abrir a página
  carregarRacas();
})();
