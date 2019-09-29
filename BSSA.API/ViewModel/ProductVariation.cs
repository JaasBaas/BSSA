using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class ProductVariation
    {
        [Key]
        [Required()]
        public int ProductVariationId { get; set; }

        [Required()]
        public int ProductId { get; set; }

        [Required()]
        public int MeasureUnitId { get; set; }

        [Required()]
        public decimal Measure { get; set; }

        public string VariationName { get; set; }
    }
}
