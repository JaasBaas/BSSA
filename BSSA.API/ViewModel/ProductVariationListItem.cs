using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class ProductVariationListItem
    {
        [Key]
        [Required()]
        public int ProductVariationId { get; set; }

        [Required()]
        public int ProductId { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string ProductName { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string BrandName { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string MeasureUnitAbbr { get; set; }

        [Required]
        public decimal Measure { get; set; }

        public string VariationName { get; set; }
    }
}
