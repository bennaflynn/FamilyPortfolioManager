using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FamilyPortfolioManager.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //the one to ones
            //builder.Entity<User>()
            //    .HasOne(u => u.Portfolio1)
            //    .WithOne(p => p.User)
            //    .HasForeignKey<Portfolio>(fk => fk.portfolioId);

            //builder.Entity<User>()
            //    .HasOne(u => u.Portfolio2)
            //    .WithOne(p => p.User)
            //    .HasForeignKey<Portfolio>(fk => fk.portfolioId);

            //builder.Entity<User>()
            //    .HasOne(u => u.Portfolio3)
            //    .WithOne(p => p.User)
            //    .HasForeignKey<Portfolio>(fk => fk.portfolioId);

            //the one to manys
            builder.Entity<Stock>()
                .HasOne(s => s.Portfolio)
                .WithMany(p => p.Stocks)
                .HasForeignKey(fk => fk.portfolioId);

            builder.Entity<Asset>()
                .HasOne(a => a.Portfolio)
                .WithMany(p => p.Assets)
                .HasForeignKey(fk => fk.portfolioId);

            base.OnModelCreating(builder);
        }

        public DbSet<User> Users {get;set;}
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
    }

    public class User
    {
        [Key]
        public Guid userId { get; set; }
        public Guid portfolioId1 { get; set; }
        public Guid portfolioId2 { get; set; }
        public Guid portfolioId3 { get; set; }
        public string username { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string password { get; set; }

        //the one to one relationship between user and portfolios
        //public virtual Portfolio Portfolio1 { get; set; }
        //public virtual Portfolio Portfolio2 { get; set; }
        //public virtual Portfolio Portfolio3 { get; set; }
    }

    public class Stock
    {
        [Key]
        public Guid stockId { get; set; }
        public Guid portfolioId { get; set; }
        public string symbol { get; set; }
        public string name { get; set; }
        public double quantityOwned { get; set; }

        //refer to the parent table
        public virtual Portfolio Portfolio { get; set; }

    }

    public class Asset
    {
        [Key]
        public Guid assetId { get; set; }
        public Guid portfolioId { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
        public double quanityOwned { get; set; }
        public double purchasePrice { get; set; }
        public double currentValue { get; set; }
        public double overhead { get; set; }

        //parent
        public virtual Portfolio Portfolio { get; set; }
    }

    public class Portfolio
    {
        [Key]
        public Guid portfolioId { get; set; }
        public string name { get; set; }
        public double value { get; set; }
        public DateTime date { get; set; }
        public string assetIds { get; set; } 

        //refer to the children
        public IEnumerable<Asset> Assets { get; set; }
        public IEnumerable<Stock> Stocks { get; set; }

        //one to one relationship between Portfolio and User
        public virtual User User { get; set; }
    }
}
