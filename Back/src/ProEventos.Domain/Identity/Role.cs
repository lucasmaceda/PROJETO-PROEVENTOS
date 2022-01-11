using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Domain.Identity
{
    public class Role
    {
        public List<UserRole> UserRoles { get; set; }
    }
}