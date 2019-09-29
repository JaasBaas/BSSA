using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class Tag
    {
        public Tag()
        {
            ProductTag = new HashSet<ProductTag>();
        }

        public int TagId { get; set; }
        public string TagName { get; set; }
        public int TagCategoryId { get; set; }

        public virtual TagCategory TagCategory { get; set; }
        public virtual ICollection<ProductTag> ProductTag { get; set; }
    }
}
