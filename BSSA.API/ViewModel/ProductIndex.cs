using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public class ProductIndex
    {
        [Key]
        [Required()]
        public int ProductId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Product Name")]
        public string ProductName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Brand")]
        public string BrandName { get; set; }

        [Display(Name = "Variations")]
        [Required()]
        public int ProductVariationCount { get; set; }
    }
}