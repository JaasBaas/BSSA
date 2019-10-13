using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class Store
    {
        public Store()
        {
            SpecialStores = new HashSet<SpecialStores>();
        }

        public int StoreId { get; set; }
        public int RetailerId { get; set; }
        public string StoreName { get; set; }
        public int TownId { get; set; }

        public virtual Retailer Retailer { get; set; }
        public virtual Town Town { get; set; }
        public virtual ICollection<SpecialStores> SpecialStores { get; set; }
    }
}
