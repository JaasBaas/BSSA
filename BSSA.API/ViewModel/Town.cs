using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class Town
    {
        [Key]
        [Required()]
        public int TownId { get; set; }

        [Required()]
        public int ProvinceId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Town")]
        public string TownName { get; set; }
    }
}
