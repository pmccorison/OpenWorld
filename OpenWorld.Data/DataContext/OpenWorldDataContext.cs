using Microsoft.EntityFrameworkCore;
using OpenWorld.Data.DbModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace OpenWorld.Data.DataContext
{
    public class OpenWorldDataContext : DbContext
    {
        public OpenWorldDataContext(DbContextOptions<OpenWorldDataContext> contextOptions) : base(contextOptions)
        {
            
        }

        public DbSet<Player> Players { get; set; }
    }
}
