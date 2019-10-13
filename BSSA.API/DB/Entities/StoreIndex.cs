using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class StoreIndex
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string RetailerName { get; set; }
        public string TownName { get; set; }
        public string ProvinceName { get; set; }
    }
}
