using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class Lookup
    {
        [Key]
        [Required(AllowEmptyStrings=false)]
        public string Value { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Label { get; set; }
    }
}
