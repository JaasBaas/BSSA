using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public class StoreIndex
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public int RetailerId { get; set; }
        public string RetailerName { get; set; }
        public int TownId { get; set; }
        public string TownName { get; set; }
        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }
    }
}