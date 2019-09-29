using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public class Brand
    {
        [Key]
        [Required]
        public int BrandId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Brand")]
        public string BrandName { get; set; }
    }
}