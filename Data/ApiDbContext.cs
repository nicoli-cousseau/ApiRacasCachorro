using Microsoft.EntityFrameworkCore;
using ApiRacasCachorro.Models;

namespace ApiRacasCachorro.Data;

class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
    }

    public DbSet<RacaEntity> Racas => Set<RacaEntity>();
}