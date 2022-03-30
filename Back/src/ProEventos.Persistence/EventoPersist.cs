using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Contextos;

namespace ProEventos.Persistence
{
    public class EventoPersist : IEventoPersist
    {
        private readonly ProEventosContext _context;

        public EventoPersist(ProEventosContext context) 
        {
            _context = context;
            _context
                .ChangeTracker
                .QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        // EVENTOS
        public async Task<Evento[]> GetAllEventosAsync(int userId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context
                                            .Eventos
                                            .Include(e => e.Lotes)
                                            .Include(e => e.RedesSociais);
            if(includePalestrantes)
            {   
                query = query.Where(e => e.UserId == userId)
                          .Include(e => e.PalestrantesEventos)
                          .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context
                                            .Eventos
                                            .Include(e => e.Lotes)
                                            .Include(e => e.RedesSociais);
            if(includePalestrantes)
            {   
                query = query
                          .Include(e => e.PalestrantesEventos)
                          .ThenInclude(pe => pe.Palestrante);
            }

            query = query
                       .OrderBy(e => e.Id)
                       .Where(e => e.Tema.ToLower().Contains(tema.ToLower()) && 
                                   e.UserId == userId);
            
            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventosByIdAsync(int userId, int EventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context
                                            .Eventos
                                            .Include(e => e.Lotes)
                                            .Include(e => e.RedesSociais);
            if(includePalestrantes)
            {   
                query = query
                          .Include(e => e.PalestrantesEventos)
                          .ThenInclude(pe => pe.Palestrante);
            }

            query = query
                       .OrderBy(e => e.Id)
                       .Where(e => e.Id == EventoId && 
                                   e.UserId == userId);
            
            return await query.FirstOrDefaultAsync();
        }
    }
}