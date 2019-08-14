using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class ProductIndex
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string BrandName { get; set; }
        public int ProductVariationCount { get; set; }
    }
}
