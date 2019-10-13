using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class SpecialItemProductVariations
    {
        public int SpecialItemId { get; set; }
        public int ProductVariationId { get; set; }

        public virtual ProductVariation ProductVariation { get; set; }
        public virtual SpecialItems SpecialItem { get; set; }
    }
}
