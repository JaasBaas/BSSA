using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class MeasureUnit
    {
        public MeasureUnit()
        {
            ProductVariation = new HashSet<ProductVariation>();
            SpecialItems = new HashSet<SpecialItems>();
        }

        public int MeasureUnitId { get; set; }
        public string MeasureUnitName { get; set; }
        public string MeasureUnitAbbr { get; set; }
        public string MeasureUnitDisplay { get; set; }

        public virtual ICollection<ProductVariation> ProductVariation { get; set; }
        public virtual ICollection<SpecialItems> SpecialItems { get; set; }
    }
}
