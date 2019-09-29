using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class ProductVariationList
    {
        public int ProductVariationId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string BrandName { get; set; }
        public string MeasureUnitAbbr { get; set; }
        public decimal Measure { get; set; }
        public string MeasureUnitName { get; set; }
        public string VariationName { get; set; }
    }
}
