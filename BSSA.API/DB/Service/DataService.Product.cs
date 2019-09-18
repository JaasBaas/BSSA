using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        public async Task<List<ProductIndex>> SelectProductsAsync(string criteria)
        {
            var x = await (from p in _db.ProductIndex
                           where p.ProductName.Contains(criteria)
                           select p).ToListAsync();
            return x;
        }
        public async Task<Product> SelectProductAsync(int productId)
        {
            var x = await (from p in _db.Product
                           where p.ProductId == productId
                           select p).SingleAsync();
            return x;
        }

        public async Task<int> InsertProductAsync(Product product)
        {
            _db.Add(product);
            await _db.SaveChangesAsync();
            return product.ProductId;
        }
    }
}