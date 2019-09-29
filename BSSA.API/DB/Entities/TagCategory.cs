using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class TagCategory
    {
        public TagCategory()
        {
            Tag = new HashSet<Tag>();
        }

        public int TagCategoryId { get; set; }
        public string TagCategoryName { get; set; }

        public virtual ICollection<Tag> Tag { get; set; }
    }
}
