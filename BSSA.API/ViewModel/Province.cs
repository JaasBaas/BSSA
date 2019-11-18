using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class Province
    {
        [Key]
        [Required()]
        public int ProvinceId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Province Name")]
        public string ProvinceName { get; set; }

    }
}
