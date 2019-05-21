using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillSplit.Models
{
    public class BillDBContext : DbContext
    {
        public BillDBContext(DbContextOptions<BillDBContext> options) : base(options)
        {

        }
        public virtual DbSet<UserExpenses> UserExpenses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Your connection string");
            }
        }
    }
}
