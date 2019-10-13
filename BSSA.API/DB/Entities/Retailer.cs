using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class Retailer
    {
        public Retailer()
        {
            Store = new HashSet<Store>();
        }

        public int RetailerId { get; set; }
        public string RetailerName { get; set; }

        public virtual ICollection<Store> Store { get; set; }
    }
}
