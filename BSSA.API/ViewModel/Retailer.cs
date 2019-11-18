using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class Retailer
    {
        [Key]
        [Required()]
        public int RetailerId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Retailer Name")]
        public string RetailerName { get; set; }
    }
}
