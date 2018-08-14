using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FamilyPortfolioManager.Models.ViewModels
{
    public class StockVM
    {
        [Required]
        public string symbol { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public double quantityOwned { get; set; }
    }
}
