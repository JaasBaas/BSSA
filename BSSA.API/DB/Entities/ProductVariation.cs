﻿using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class ProductVariation
    {
        public ProductVariation()
        {
            SpecialItemProductVariations = new HashSet<SpecialItemProductVariations>();
        }

        public int ProductVariationId { get; set; }
        public int ProductId { get; set; }
        public int MeasureUnitId { get; set; }
        public decimal Measure { get; set; }
        public string VariationName { get; set; }

        public virtual MeasureUnit MeasureUnit { get; set; }
        public virtual Product Product { get; set; }
        public virtual ICollection<SpecialItemProductVariations> SpecialItemProductVariations { get; set; }
    }
}
