using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Contextos;


namespace ProEventos.Persistence
{
    public class PalestrantePersist : IPalestrantePersist
    {
        private readonly ProEventosContext _context;

        public PalestrantePersist(ProEventosContext context) 
        {
            _context = context;
        }

        // PALESTRANTES
        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos)
        {
            IQueryable<Palestrante> query = _context
                                                .Palestrantes
                                                .Include(p => p.RedesSociais);
            if(includeEventos)
            {   
                query = query
                          .Include(p => p.PalestrantesEventos)
                          .ThenInclude(pe => pe.Evento);
            }

            query = query.OrderBy(p => p.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNameAsync(string nome, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context
                                                .Palestrantes
                                                .Include(p => p.RedesSociais);
            if(includeEventos)
            {   
                query = query
                          .Include(p => p.PalestrantesEventos)
                          .ThenInclude(pe => pe.Evento);
            }

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteByIdAsync(int PalestranteId, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context
                                                .Palestrantes
                                                .Include(p => p.RedesSociais);
            if(includeEventos)
            {   
                query = query
                          .Include(p => p.PalestrantesEventos)
                          .ThenInclude(pe => pe.Evento);
            }

            query = query.OrderBy(p => p.Id)
                         .Where(p => p.Id == PalestranteId);
                         
            return await query.FirstOrDefaultAsync();
        }
    
    }
}