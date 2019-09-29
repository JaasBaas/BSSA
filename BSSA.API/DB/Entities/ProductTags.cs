using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class ProductTags
    {
        public int ProductId { get; set; }
        public int TagId { get; set; }
        public string TagName { get; set; }
        public string TagCategoryName { get; set; }
    }
}
