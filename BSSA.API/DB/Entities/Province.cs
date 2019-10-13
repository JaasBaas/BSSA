using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class Province
    {
        public Province()
        {
            Town = new HashSet<Town>();
        }

        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }

        public virtual ICollection<Town> Town { get; set; }
    }
}
