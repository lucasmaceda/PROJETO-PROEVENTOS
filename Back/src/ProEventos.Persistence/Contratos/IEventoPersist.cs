using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IEventoPersist
    {
        // EVENTOS
        Task<Evento[]> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventosAsync(int userId, bool includePalestrantes);
        Task<Evento> GetEventosByIdAsync(int userId, int EventoId, bool includePalestrantes);
    }
}