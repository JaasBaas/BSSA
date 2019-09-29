using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class ProductTagListItem
    {
        [Key]
        [Required()]
        public int ProductId { get; set; }

        [Key]
        [Required()]
        public int TagId { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string TagName { get; set; }

        public string TagCategoryName { get; set; }
    }
}
