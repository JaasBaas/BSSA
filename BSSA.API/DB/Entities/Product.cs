using System;
using System.Collections.Generic;

namespace BSSA.API.DB.Entities
{
    public partial class Product
    {
        public Product()
        {
            ProductVariation = new HashSet<ProductVariation>();
        }

        public int ProductId { get; set; }
        public string Name { get; set; }
        public int BrandId { get; set; }

        public virtual Brand Brand { get; set; }
        public virtual ICollection<ProductVariation> ProductVariation { get; set; }
    }
}
