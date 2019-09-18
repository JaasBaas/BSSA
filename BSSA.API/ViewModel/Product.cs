using System.ComponentModel.DataAnnotations;

namespace BSSA.API.ViewModel
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Product Name")]
        public string Name { get; set; }

        [Display(Name = "Brand")]
        [Required()]
        public int? BrandId { get; set; }
    }
}