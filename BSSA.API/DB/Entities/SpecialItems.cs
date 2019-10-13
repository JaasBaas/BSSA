using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class SpecialItems
    {
        public SpecialItems()
        {
            SpecialItemProductVariations = new HashSet<SpecialItemProductVariations>();
        }

        public int SpecialItemId { get; set; }
        public int SpecialId { get; set; }
        public int MinQty { get; set; }
        public int MeasureUnitId { get; set; }
        public decimal Price { get; set; }
        public int SpecialItemTypeId { get; set; }

        public virtual MeasureUnit MeasureUnit { get; set; }
        public virtual Special Special { get; set; }
        public virtual SpecialItemType SpecialItemType { get; set; }
        public virtual ICollection<SpecialItemProductVariations> SpecialItemProductVariations { get; set; }
    }
}
