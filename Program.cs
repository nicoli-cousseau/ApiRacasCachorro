using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseStaticFiles();

// Rota raiz - confirma que a API está no ar
app.MapGet("/", () => "API de Raças de Cachorros está no ar! 🐶");

// GET - lista todas as raças gravadas no banco
app.MapGet("/api/racas", async (ApiDbContext db) =>
    await db.Racas.ToListAsync());

// GET - busca uma raça pelo id
app.MapGet("/api/racas/{id}", async(int id, ApiDbContext db) =>
{
    var raca = await db.Racas.FindAsync(id);
    return raca is not null ? Results.Ok(raca) : Results.NotFound();
});

// POST - cadastra uma nova raça direto no banco
app.MapPost("/api/racas", async (RacaEntity raca, ApiDbContext db) =>
{
    db.Racas.Add(raca);
    await db.SaveChangesAsync();
    return Results.Created($"/api/racas/{raca.Id}", raca);
});

// PUT - atualiza uma raça existente
app.MapPut("/api/racas/{id}", async(int id, RacaEntity racaAtualizada, ApiDbContext db) =>
{
   var raca = await db.Racas.FindAsync(id);
    if (raca is null)return  Results.NotFound(); 
    raca.Nome = racaAtualizada.Nome;
    raca.Grupo = racaAtualizada.Grupo;
    raca.Porte = racaAtualizada.Porte;
    raca.Temperamento = racaAtualizada.Temperamento;
    raca.PaisOrigem = racaAtualizada.PaisOrigem;
    raca.ExpectativaVidaAnos = racaAtualizada.ExpectativaVidaAnos;

    await db.SaveChangesAsync();
    return Results.Ok(raca);

});

// DELETE - remove uma raça
app.MapDelete("/api/racas/{id}", async(int id, ApiDbContext db) =>
{
   var raca = await db.Racas.FindAsync(id);
    if (raca is null)return  Results.NotFound(); 

    db.Racas.Remove(raca);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

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