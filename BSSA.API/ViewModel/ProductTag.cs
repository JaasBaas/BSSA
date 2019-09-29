using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class ProductTag
    {
        [Key]
        [Required()]
        public int ProductId { get; set; }

        [Key]
        [Required()]
        public int TagId { get; set; }
    }
}
