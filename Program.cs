using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// "Banco de dados" em memória: uma lista de raças, com 10 registros iniciais
var racas = new List<Raca>
{
    new Raca(1, "Labrador Retriever", "Esportivo", "Grande", "Amigável, ativo, gosta de água", "Canadá", 12),
    new Raca(2, "Pug", "Companhia", "Pequeno", "Afetuoso, brincalhão, teimoso", "China", 14),
    new Raca(3, "Border Collie", "Pastoreio", "Médio", "Inteligente, energético, obediente", "Reino Unido", 13),
    new Raca(4, "Bulldog Francês", "Companhia", "Pequeno", "Calmo, sociável, adaptável", "França", 11),
    new Raca(5, "Golden Retriever", "Esportivo", "Grande", "Amigável, paciente, confiável", "Escócia", 12),
    new Raca(6, "Poodle", "Não Esportivo", "Médio", "Inteligente, ativo, elegante", "Alemanha/França", 14),
    new Raca(7, "Beagle", "Faro", "Pequeno", "Curioso, alegre, teimoso", "Reino Unido", 13),
    new Raca(8, "Chihuahua", "Companhia", "Pequeno", "Alerta, ágil, corajoso", "México", 16),
    new Raca(9, "Rottweiler", "Trabalho", "Grande", "Leal, confiante, protetor", "Alemanha", 10),
    new Raca(10, "Shih Tzu", "Companhia", "Pequeno", "Afetuoso, extrovertido, tranquilo", "China", 13)
};

int proximoId = 11; // controla o próximo Id disponível (ajustado por causa dos 10 registros iniciais)

// Rota raiz - confirma que a API está no ar
app.MapGet("/", () => "API de Raças de Cachorros está no ar! 🐶");

// GET - lista todas as raças
app.MapGet("/api/racas", () => Results.Ok(racas));

// GET - busca uma raça pelo id
app.MapGet("/api/racas/{id}", (int id) =>
{
    var raca = racas.FirstOrDefault(r => r.Id == id);
    return raca is not null ? Results.Ok(raca) : Results.NotFound();
});

// POST - cadastra uma nova raça
app.MapPost("/api/racas", (RacaDto novaRacaDto) =>
{
    var novaRaca = new Raca(
        proximoId++,
        novaRacaDto.Nome,
        novaRacaDto.Grupo,
        novaRacaDto.Porte,
        novaRacaDto.Temperamento,
        novaRacaDto.PaisOrigem,
        novaRacaDto.ExpectativaVidaAnos
    );

    racas.Add(novaRaca);
    return Results.Created($"/api/racas/{novaRaca.Id}", novaRaca);
});

// PUT - atualiza uma raça existente
app.MapPut("/api/racas/{id}", (int id, RacaDto racaAtualizada) =>
{
    var index = racas.FindIndex(r => r.Id == id);
    if (index == -1) return Results.NotFound();

    racas[index] = new Raca(
        id,
        racaAtualizada.Nome,
        racaAtualizada.Grupo,
        racaAtualizada.Porte,
        racaAtualizada.Temperamento,
        racaAtualizada.PaisOrigem,
        racaAtualizada.ExpectativaVidaAnos
    );

    return Results.Ok(racas[index]);
});

// DELETE - remove uma raça
app.MapDelete("/api/racas/{id}", (int id) =>
{
    var raca = racas.FirstOrDefault(r => r.Id == id);
    if (raca is null) return Results.NotFound();

    racas.Remove(raca);
    return Results.NoContent();
});

app.Run();

// Modelo principal: uma raça já cadastrada (tem Id)
record Raca(int Id, string Nome, string Grupo, string Porte, string Temperamento, string PaisOrigem, int ExpectativaVidaAnos);

// DTO de entrada: o que o cliente envia (sem Id)
record RacaDto(string Nome, string Grupo, string Porte, string Temperamento, string PaisOrigem, int ExpectativaVidaAnos);

class RacaEntity
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Grupo { get; set; } = string.Empty;
    public string Porte { get; set; } = string.Empty;
    public string Temperamento { get; set; } = string.Empty;
    public string PaisOrigem { get; set; } = string.Empty;
    public int ExpectativaVidaAnos { get; set; }
}

class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
    }

    public DbSet<RacaEntity> Racas => Set<RacaEntity>();
}