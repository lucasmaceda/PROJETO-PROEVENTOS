using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence
{
    public class PalestrantePersist : GeralPersist, IPalestrantePersist
    {
        private readonly ProEventosContext _context;

        public PalestrantePersist(ProEventosContext context) : base(context)
        {
            _context = context;
        }

        // PALESTRANTES
        public async Task<PageList<Palestrante>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                                .Include(p => p.User)
                                                .Include(p => p.RedesSociais);
            if(includeEventos)
            {   
                query = query
                          .Include(p => p.PalestrantesEventos)
                          .ThenInclude(pe => pe.Evento);
            }

            query = query
                    .Where(p => (p.MiniCurriculo.ToLower().Contains(pageParams.Term.ToLower()) ||
                                 p.User.PrimeiroNome.ToLower().Contains(pageParams.Term.ToLower()) ||
                                 p.User.UltimoNome.ToLower().Contains(pageParams.Term.ToLower())) &&
                                 p.User.Funcao == Domain.Enum.Funcao.Palestrante)
                    .OrderBy(p => p.Id);

            return await PageList<Palestrante>.CreateAsync(query, pageParams.PageNumber, pageParams.pageSize);
        }

        public async Task<Palestrante> GetPalestranteByIdAsync(int userId, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context
                                                .Palestrantes
                                                .Include(p => p.User)
                                                .Include(p => p.RedesSociais);
            if(includeEventos)
            {   
                query = query
                          .Include(p => p.PalestrantesEventos)
                          .ThenInclude(pe => pe.Evento);
            }

            query = query.OrderBy(p => p.Id)
                         .Where(p => p.UserId == userId);
                         
            return await query.FirstOrDefaultAsync();
        }
    
    }
}