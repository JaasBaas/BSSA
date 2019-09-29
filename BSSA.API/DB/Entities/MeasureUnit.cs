using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class MeasureUnit
    {
        public MeasureUnit()
        {
            ProductVariation = new HashSet<ProductVariation>();
        }

        public int MeasureUnitId { get; set; }
        public string MeasureUnitName { get; set; }
        public string MeasureUnitAbbr { get; set; }

        public virtual ICollection<ProductVariation> ProductVariation { get; set; }
    }
}
