using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class SpecialType
    {
        public SpecialType()
        {
            Special = new HashSet<Special>();
        }

        public int SpecialTypeId { get; set; }
        public string SpecialTypeName { get; set; }

        public virtual ICollection<Special> Special { get; set; }
    }
}
