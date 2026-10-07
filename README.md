# API de Raças de Cachorros

API REST simples desenvolvida em ASP.NET Core / .NET 10 (Minimal API),
com CRUD completo em memória, feita como parte da Avaliação Parcial 1 (AP1)
da disciplina de Desenvolvimento Back-End.

## Requisito
.NET 10

## Como executar
1. Instale o SDK do .NET 10
2. Clone este repositório
3. Rode: dotnet run --urls http://localhost:5050

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
Os dados ficam apenas em memória e são perdidos ao reiniciar a aplicação.

## Collection de testes
A Collection do Bruno está na pasta /bruno deste repositório.

## Vídeo de demonstração
https://drive.google.com/file/d/1kbbmN3k0HlMMSFe6tnRm3SoajwzRd8km/view?usp=sharing 

## Interface de demonstração (Aula 11)

Uma interface estática de demonstração foi criada em `wwwroot/` usando o Google
Antigravity, com HTML, CSS e JavaScript puros (sem framework, biblioteca ou CDN).
Ela permite visualizar uma lista de raças e cadastrar uma nova raça, mas usa
apenas dados fictícios guardados em memória no navegador — ainda **não está
conectada à API**. Essa conexão será feita na próxima etapa do projeto.

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