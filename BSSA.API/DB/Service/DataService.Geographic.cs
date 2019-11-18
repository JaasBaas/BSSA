using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        public async Task<List<Province>> SelectProvinces()
        {
            var x = await (from p in _db.Province
                           orderby p.ProvinceName
                           select p).ToListAsync();
            return x;
        }
        public async Task<List<Town>> SelectTowns(int provinceId)
        {
            var x = await (from p in _db.Town
                           where p.ProvinceId == provinceId
                           orderby p.TownName
                           select p).ToListAsync();
            return x;
        }

        /*
        public async Task<int> InsertBrandAsync(Brand Brand)
        {
            _db.Add(Brand);
            await _db.SaveChangesAsync();
            return Brand.BrandId;
        }
       */
    }
}