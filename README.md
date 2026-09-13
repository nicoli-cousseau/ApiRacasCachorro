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
[link aqui]