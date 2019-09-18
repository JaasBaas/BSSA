using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        public async Task<List<Brand>> SelectBrandsAsync()
        {
            var x = await (from p in _db.Brand
                           select p).ToListAsync();
            return x;
        }
        public async Task<Brand> SelectBrandAsync(int BrandId)
        {
            var x = await (from p in _db.Brand
                           where p.BrandId == BrandId
                           select p).SingleAsync();
            return x;
        }

        public async Task<int> InsertBrandAsync(Brand Brand)
        {
            _db.Add(Brand);
            await _db.SaveChangesAsync();
            return Brand.BrandId;
        }
    }
}