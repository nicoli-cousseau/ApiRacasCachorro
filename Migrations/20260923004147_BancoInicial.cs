using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiRacasCachorro.Migrations
{
    /// <inheritdoc />
    public partial class BancoInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Racas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Grupo = table.Column<string>(type: "TEXT", nullable: false),
                    Porte = table.Column<string>(type: "TEXT", nullable: false),
                    Temperamento = table.Column<string>(type: "TEXT", nullable: false),
                    PaisOrigem = table.Column<string>(type: "TEXT", nullable: false),
                    ExpectativaVidaAnos = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Racas", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Racas");
        }
    }
}
