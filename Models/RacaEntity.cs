namespace ApiRacasCachorro.Models;

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