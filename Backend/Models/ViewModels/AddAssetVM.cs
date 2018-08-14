using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FamilyPortfolioManager.Models.ViewModels
{
    public class AddAssetVM
    {
        [Required]
        public string type { get; set; }
        [Required]
        public string name { get; set; }
        public string imageUrl { get; set; }
        [Required]
        public double quanityOwned { get; set; }
        [Required]
        public double purchasePrice { get; set; }
        public double currentValue { get; set; }
        public double overhead { get; set; }
    }
}
