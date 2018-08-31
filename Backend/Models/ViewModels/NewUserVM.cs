using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FamilyPortfolioManager.Models.ViewModels
{
    public class NewUserVM
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string firstname { get; set; }
        [Required]
        public string lastname { get; set; }
        [Required]
        public string password { get; set; }
        public string portfolioId { get; set; }

    }
}
