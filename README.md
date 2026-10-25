# API de Raças de Cachorros

API REST desenvolvida em ASP.NET Core / .NET 10 (Minimal API), com CRUD
completo persistido em banco SQLite via Entity Framework Core. Começou como
a Avaliação Parcial 1 (AP1) da disciplina de Desenvolvimento Back-End e foi
evoluída nos encontros seguintes (persistência com EF Core, interface web
integrada).

## Requisito
.NET 10

## Como executar
1. Instale o SDK do .NET 10
2. Clone este repositório
3. Restaure os pacotes: `dotnet restore`
4. Instale a ferramenta do EF Core (só uma vez): `dotnet tool install --global dotnet-ef`
5. Crie o banco a partir das migrations: `dotnet ef database update`
6. Rode a API: `dotnet run --urls http://localhost:5050`

## Exemplo de JSON (POST/PUT)
```json
{
  "nome": "Dálmata",
  "grupo": "Não Esportivo",
  "porte": "Médio",
  "temperamento": "Ativo, alerta, brincalhão",
  "paisOrigem": "Croácia",
  "expectativaVidaAnos": 13
}
```

## Como abrir a interface
Com a API rodando, abra no navegador: http://localhost:5050/index.html
A interface (pasta `wwwroot/`) é servida pela própria API, na mesma origem, por isso não usa CORS.

## URL local usada nos testes
http://localhost:5050

## Endpoints
| Método | Rota | Descrição |
|---|---|---|
| GET | / | Confirma que a API está no ar |
| GET | /api/racas | Lista todas as raças |
| GET | /api/racas/{id} | Busca uma raça por id |
| POST | /api/racas | Cadastra uma nova raça |
| PUT | /api/racas/{id} | Atualiza uma raça existente |
| DELETE | /api/racas/{id} | Remove uma raça |

## Exemplo de JSON (POST/PUT)
{
  "nome": "Dálmata",
  "grupo": "Não Esportivo",
  "porte": "Médio",
  "temperamento": "Ativo, alerta, brincalhão",
  "paisOrigem": "Croácia",
  "expectativaVidaAnos": 13
}

## Aviso
Os dados são persistidos em um banco SQLite local (`ApiRacasCachorro.db`),
criado pelo comando `dotnet ef database update` a partir das migrations
versionadas na pasta `Migrations/`. O arquivo do banco não é versionado no Git
(está no `.gitignore`).

## Collection de testes
> A Collection do Bruno está na pasta /bruno deste repositório.
> Rode primeiro `03 - Cadastrar` e use o id retornado nas requisições 02, 04, 05 e 06.

## Vídeo de demonstração — AP1
https://drive.google.com/file/d/1kbbmN3k0HlMMSFe6tnRm3SoajwzRd8km/view?usp=sharing 

## Vídeo de demonstração — AP2
COLE_AQUI_O_LINK_PUBLICO_DO_NOVO_VIDEO

## Interface web (Aulas 11 e 12)
A interface em `wwwroot/` foi criada com o Google Antigravity (Aula 11, dados
fictícios) e, na Aula 12, foi conectada à API real: agora ela lista, cadastra,
edita e exclui raças consumindo diretamente os endpoints `/api/racas` do
backend (sem dados fictícios).

### Prompt utilizado
> Analise o projeto da minha API da AP1 e crie somente uma interface de
> demonstração para Raças de Cachorros, dentro de wwwroot/.
>
> Objetivo: permitir visualizar uma lista de raças (nome, grupo a que pertence,
> porte, temperamento, país de origem e expectativa de vida em anos) e um
> formulário visual para cadastrar uma nova raça.
> Contexto: a API já existe; nesta tarefa NÃO conecte ao backend. Use apenas
> dados fictícios locais e identifique-os como demonstração.
> Tecnologias: HTML, CSS e JavaScript puros, sem framework, biblioteca, CDN ou
> instalação de pacote.
> Limites: não altere Program.cs, Models, rotas, banco, arquivos de
> configuração nem arquivos fora de wwwroot/. Não apague arquivos existentes.
> Não use chaves, credenciais ou dados pessoais.
> Critérios: interface responsiva; rótulos associados aos campos; foco de
> teclado visível; mensagens claras; três arquivos simples (index.html,
> style.css, app.js), se ainda não existirem.
> Antes de editar, mostre o plano e os arquivos que pretende alterar. Aguarde
> minha aprovação. Depois de executar, explique os arquivos alterados,
> abra/teste a interface e liste limitações. Não afirme que a API foi
> conectada.

### Restrição que evitou uma alteração indevida
A regra "nesta tarefa NÃO conecte ao backend" impediu que o agente usasse
`fetch` ou qualquer chamada HTTP — ele manteve todos os dados estritamente
locais, como o próprio relatório de limitações confirmou.


### Prompt utilizado na integração (Aula 12)
> Integre a interface existente em wwwroot/ com a API desta aplicação. Antes
> de editar, leia os arquivos da interface e use exatamente os endpoints,
> métodos, propriedades JSON e respostas que já validei na collection Bruno.
> Mostre um plano e aguarde minha aprovação.

> Escopo: editar apenas arquivos dentro de wwwroot/. Não altere Models,
> DbContext, migrations, banco, rotas, configurações ou dependências. Não
> invente endpoints. Não use dados fictícios nem credenciais.

> Implemente na interface: listar registros, criar, editar e excluir. Confira
> resposta.ok/status; mostre carregamento, lista vazia e erro; depois de cada
> gravação, recarregue os dados. Insira valores da API com textContent, não
> como HTML.