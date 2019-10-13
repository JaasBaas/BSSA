using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class SpecialItemType
    {
        public SpecialItemType()
        {
            SpecialItems = new HashSet<SpecialItems>();
        }

        public int SpecialItemTypeId { get; set; }
        public string SpecialItemTypeName { get; set; }
        public string SpecialItemTypeRule { get; set; }
        public string SpecialItemTypeDesc { get; set; }
        public bool IsCombo { get; set; }

        public virtual ICollection<SpecialItems> SpecialItems { get; set; }
    }
}
