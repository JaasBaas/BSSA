using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public partial class MeasureUnitLookup
    {
        [Key]
        [Required]
        public int MeasureUnitId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Measure Unit")]
        public string MeasureUnitDisplay { get; set; }
    }
}
