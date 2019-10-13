using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class Town
    {
        public Town()
        {
            Store = new HashSet<Store>();
        }

        public int TownId { get; set; }
        public string TownName { get; set; }
        public int ProvinceId { get; set; }

        public virtual Province Province { get; set; }
        public virtual ICollection<Store> Store { get; set; }
    }
}
