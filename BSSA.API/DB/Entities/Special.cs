using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class Special
    {
        public Special()
        {
            SpecialItems = new HashSet<SpecialItems>();
            SpecialStores = new HashSet<SpecialStores>();
        }

        public int SpecialId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int SpecialTypeId { get; set; }
        public string SpecialName { get; set; }
        public DateTime CapturedOn { get; set; }

        public virtual SpecialType SpecialType { get; set; }
        public virtual ICollection<SpecialItems> SpecialItems { get; set; }
        public virtual ICollection<SpecialStores> SpecialStores { get; set; }
    }
}
