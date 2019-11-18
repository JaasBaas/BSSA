using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class Store
    {
        [Key]
        [Required()]
        public int StoreId { get; set; }

        [Required()]
        public int RetailerId { get; set; }

        [Required()]
        public int TownId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Store Name")]
        public string StoreName { get; set; }
    }
}
