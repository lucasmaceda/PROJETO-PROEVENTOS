using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface ILoteService
    {
        Task<LoteDto[]> SaveLote(int eventoId, LoteDto[] models);
        Task<bool> DeleteLote(int eventoId, int loteId);
        
        Task<LoteDto[]> GetLotesByEventoByIdAsync(int eventoId);
        Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId);
    }
}