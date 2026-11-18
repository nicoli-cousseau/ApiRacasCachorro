using ApiRacasCachorro.Data;
using ApiRacasCachorro.Dtos;
using ApiRacasCachorro.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        await context.Response.WriteAsJsonAsync(new
        {
            mensagem = "Ocorreu um erro interno. Tente novamente mais tarde."
        });
    });
});

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
app.MapPost("/api/racas", async (RacaEntrada entrada, ApiDbContext db) =>
{
    var raca = new RacaEntity
    {
        Nome = entrada.Nome,
        Grupo = entrada.Grupo,
        Porte = entrada.Porte,
        Temperamento = entrada.Temperamento,
        PaisOrigem = entrada.PaisOrigem,
        ExpectativaVidaAnos = entrada.ExpectativaVidaAnos
    };

    db.Racas.Add(raca);
    await db.SaveChangesAsync();
    return Results.Created($"/api/racas/{raca.Id}", raca);
});

// PUT - atualiza uma raça existente
app.MapPut("/api/racas/{id}", async (int id, RacaEntrada entrada, ApiDbContext db) =>
{
    var raca = await db.Racas.FindAsync(id);
    if (raca is null) return Results.NotFound();

    raca.Nome = entrada.Nome;
    raca.Grupo = entrada.Grupo;
    raca.Porte = entrada.Porte;
    raca.Temperamento = entrada.Temperamento;
    raca.PaisOrigem = entrada.PaisOrigem;
    raca.ExpectativaVidaAnos = entrada.ExpectativaVidaAnos;

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
