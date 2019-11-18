using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class Lookup
    {
        [Key]
        [Required()]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Value { get; set; }
    }
}
