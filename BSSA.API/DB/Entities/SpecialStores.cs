using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class SpecialStores
    {
        public int SpecialId { get; set; }
        public int StoreId { get; set; }

        public virtual Special Special { get; set; }
        public virtual Store Store { get; set; }
    }
}
