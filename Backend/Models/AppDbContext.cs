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

        public DbSet<User> Users {get;set;}
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
    }

    public class User
    {
        [Key]
        public Guid userId { get; set; }
        public string username { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string password { get; set; }
    }

    public class Stock
    {
        [Key]
        public Guid stockId { get; set; }
        public string symbol { get; set; }
        public string name { get; set; }
        public double quantityOwned { get; set; }

    }

    public class Asset
    {
        [Key]
        public Guid assetId { get; set; }
        public string type { get; set; }
        public double quanityOwned { get; set; }
        public double purchasePrice { get; set; }
        public double currentValue { get; set; }
        public double overhead { get; set; }
    }

    public class Portfolio
    {
        [Key]
        public Guid portfolioId { get; set; }
        public double value { get; set; }
        public DateTime date { get; set; }
        public string assetIds { get; set; } 
    }
}
