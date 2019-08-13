using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        public async Task<List<ProductIndex>> SelectProductsAsync()
        {
            var x = await (from p in _db.ProductIndex
                           select p).ToListAsync();
            return x;
        }

    }
}