using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FamilyPortfolioManager.Models.ViewModels
{
    public class QChangeStockVM
    {
        [Required]
        public Guid id { get; set; }
        public double quantity { get; set; }
    }
}
